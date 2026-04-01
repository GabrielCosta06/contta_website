import { NextResponse } from "next/server";

import {
  hasLeadDeliveryTarget,
  ValidationError,
  persistLeadIfConfigured,
  sendLeadEmail,
  validateLeadPayload,
} from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!hasLeadDeliveryTarget()) {
      throw new Error("Lead delivery is not configured.");
    }

    const payload = await request.json();
    const lead = validateLeadPayload(payload);

    const [emailResult, storageResult] = await Promise.allSettled([
      sendLeadEmail(lead),
      persistLeadIfConfigured(lead),
    ]);

    if (emailResult.status === "rejected" && storageResult.status === "rejected") {
      throw emailResult.reason;
    }

    if (storageResult.status === "rejected") {
      console.error("[api/leads] failed to persist lead", storageResult.reason);
    }

    if (emailResult.status === "rejected") {
      console.error("[api/leads] failed to send lead email", emailResult.reason);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Recebemos seu cenário. A equipe da Contta vai responder pelo canal informado.",
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          ok: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    console.error("[api/leads] failed to process lead", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível enviar agora. Tente novamente em instantes.",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
