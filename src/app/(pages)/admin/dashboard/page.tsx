import DashboardShowStats from "~/components/dashboard/dashboard-shows-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const t = await api.show.getTotal();

  console.log({ t });
  return (
    <Tabs defaultValue="shows">
      <TabsList className="mb-4">
        <TabsTrigger value="shows">Shows stats</TabsTrigger>
        <TabsTrigger value="bands">Bands stats</TabsTrigger>
      </TabsList>
      <TabsContent value="shows">
        <DashboardShowStats />
      </TabsContent>
      <TabsContent value="bands">Bands view</TabsContent>
    </Tabs>
  );
}
