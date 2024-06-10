import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="shows">
      <TabsList>
        <TabsTrigger value="shows">Shows stats</TabsTrigger>
        <TabsTrigger value="bands">Bands stats</TabsTrigger>
      </TabsList>
      <TabsContent value="shows">Shows view</TabsContent>
      <TabsContent value="bands">Bands view</TabsContent>
    </Tabs>
  );
}
