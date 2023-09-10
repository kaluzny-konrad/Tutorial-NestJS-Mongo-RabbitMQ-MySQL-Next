import Auth from "@/components/Auth/Auth";

export default function page() {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Auth initType="sign-in" />
      </div>
    </div>
  );
}
