import { UrlCard } from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamBuUserId } from "@/lib/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModel } from "./_components/connect-model";

export default async function KeysPage() {
  const self = await getSelf();
  const stream = await getStreamBuUserId(self.id);

  if (!stream) {
    throw new Error("Stream not Found");
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Keys & Urls</h1>
          <ConnectModel />
        </div>
        <div className="space-y-4">
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </div>
      </div>
    </>
  );
}
