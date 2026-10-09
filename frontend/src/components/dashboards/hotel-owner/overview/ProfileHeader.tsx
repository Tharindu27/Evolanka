import { Card } from "./Card";
import { COVER_IMAGE, LOGO_IMAGE } from "./constants";

export function ProfileHeader() {
  return (
    <Card className="mb-6 overflow-hidden">
      <div
        className="relative h-48 w-full bg-cover bg-center md:h-64"
        style={{ backgroundImage: `url("${COVER_IMAGE}")` }}
      >
        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex items-center gap-xs rounded-lg bg-surface/90 px-4 py-2 font-label-sm text-label-sm text-on-surface backdrop-blur-md transition-colors hover:bg-surface"
        >
          <span className="material-symbols-outlined text-[18px]">
            photo_camera
          </span>
          Edit Cover
        </button>
      </div>

      <div className="relative px-6 pb-6">
        <div className="-mt-12 flex flex-col items-end gap-6 md:-mt-16 md:flex-row md:items-center">
          <div className="relative shrink-0">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-surface shadow-lg md:h-40 md:w-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full object-cover"
                src={LOGO_IMAGE}
                alt="Grand Horizon Hotel logo"
              />
            </div>

            <button
              type="button"
              aria-label="Edit hotel logo"
              className="absolute bottom-2 right-2 rounded-full border border-outline-variant bg-surface-container-high p-2 text-on-surface shadow-sm transition-colors hover:bg-primary hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface md:font-headline-md md:text-headline-md">
              Grand Horizon Hotel
            </h1>
            <p className="flex items-center gap-1 font-body-md text-body-md text-on-surface-variant">
              <span className="material-symbols-outlined fill-1 text-[16px] text-primary">
                stars
              </span>
              Premium Provider • Tangalle, Sri Lanka
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-4 py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined text-[20px]">
              share
            </span>
            Share
          </button>
        </div>
      </div>
    </Card>
  );
}