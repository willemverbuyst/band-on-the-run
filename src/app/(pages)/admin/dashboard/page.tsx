import DashboardShowStats from "~/components/dashboard/dashboard-shows-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="shows" className="m-auto lg:max-w-[80vw]">
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
