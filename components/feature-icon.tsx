type FeatureIconName =
  | "shield"
  | "flow"
  | "layers"
  | "radar"
  | "chart"
  | "wallet"
  | "receipt"
  | "file"
  | "target"
  | "offline"
  | "lock"
  | "sync"
  | "spark"
  | "boundary";

type FeatureIconProps = {
  name: FeatureIconName;
};

export function FeatureIcon({ name }: FeatureIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="feature-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "shield" ? (
        <>
          <path d="M12 3 5.5 6v4.8c0 4.2 2.8 7.8 6.5 9.2 3.7-1.4 6.5-5 6.5-9.2V6L12 3Z" />
          <path d="m9.5 12 1.7 1.7 3.6-4" />
        </>
      ) : null}

      {name === "flow" ? (
        <>
          <path d="M5 7h10" />
          <path d="m12 4 3 3-3 3" />
          <path d="M19 17H9" />
          <path d="m12 14-3 3 3 3" />
        </>
      ) : null}

      {name === "layers" ? (
        <>
          <path d="m12 4 7 4-7 4-7-4 7-4Z" />
          <path d="m5 12 7 4 7-4" />
          <path d="m5 16 7 4 7-4" />
        </>
      ) : null}

      {name === "radar" ? (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12 17.5 8.5" />
          <circle cx="17.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        </>
      ) : null}

      {name === "chart" ? (
        <>
          <path d="M5 18h14" />
          <path d="M7.5 15V11.5" />
          <path d="M12 15V8.5" />
          <path d="M16.5 15V6" />
        </>
      ) : null}

      {name === "wallet" ? (
        <>
          <path d="M5.5 8.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
          <path d="M5.5 8.5V7.8a1.8 1.8 0 0 1 1.8-1.8h8.5" />
          <circle cx="15.8" cy="13" r="0.9" fill="currentColor" stroke="none" />
        </>
      ) : null}

      {name === "receipt" ? (
        <>
          <path d="M7 4.5h10v15l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V4.5Z" />
          <path d="M9.5 9h5" />
          <path d="M9.5 12h5" />
          <path d="M9.5 15h3.2" />
        </>
      ) : null}

      {name === "file" ? (
        <>
          <path d="M8 4.5h6l3 3v12H8a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
          <path d="M14 4.5v3h3" />
          <path d="M9.5 12H14.5" />
          <path d="M9.5 15H14.5" />
        </>
      ) : null}

      {name === "target" ? (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 4.5V7" />
          <path d="M19.5 12H17" />
          <path d="M12 19.5V17" />
          <path d="M4.5 12H7" />
        </>
      ) : null}

      {name === "offline" ? (
        <>
          <path d="M4.5 9.5a12 12 0 0 1 15 0" />
          <path d="M7.5 12.5a7.8 7.8 0 0 1 9 0" />
          <path d="M10.5 15.5a3.8 3.8 0 0 1 3 0" />
          <circle cx="12" cy="18.5" r="1.1" fill="currentColor" stroke="none" />
        </>
      ) : null}

      {name === "lock" ? (
        <>
          <rect x="6.5" y="11" width="11" height="9" rx="2" />
          <path d="M9 11V8.8a3 3 0 1 1 6 0V11" />
        </>
      ) : null}

      {name === "sync" ? (
        <>
          <path d="M7.5 8A6 6 0 0 1 18 11h2.2" />
          <path d="m18 8.8 2 2.2-2 2.2" />
          <path d="M16.5 16A6 6 0 0 1 6 13H3.8" />
          <path d="m6 15.2-2-2.2 2-2.2" />
        </>
      ) : null}

      {name === "spark" ? (
        <>
          <path d="m12 4 1.2 3.3L16.5 8.5l-3.3 1.2L12 13l-1.2-3.3L7.5 8.5l3.3-1.2L12 4Z" />
          <path d="m18 14 .7 1.9L20.6 16l-1.9.7L18 18.6l-.7-1.9-1.9-.7 1.9-.1L18 14Z" />
          <path d="m6 14 .7 1.9L8.6 16l-1.9.7L6 18.6l-.7-1.9-1.9-.7 1.9-.1L6 14Z" />
        </>
      ) : null}

      {name === "boundary" ? (
        <>
          <path d="M8 6h8" />
          <path d="M8 18h8" />
          <path d="M10 6v12" />
          <path d="M14 6v12" />
          <path d="M6 12h12" />
        </>
      ) : null}
    </svg>
  );
}
