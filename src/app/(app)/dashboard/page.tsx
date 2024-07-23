
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartComponent } from "@/components/ChartComponent";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="space-y-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Menubar className="max-w-64">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      </Menubar>
      <div className="flex flex-row min-w-screen gap-10">
        <div>
          <Card className="flex flex-col  ">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-green-400">$45,231.89</h2>
            </CardContent>
            <CardFooter>
              <p className="text-gray-400">+20.1% from last month</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex flex-col ">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-red-600">-150</h2>
            </CardContent>
            <CardFooter>
              <p className="text-gray-400">-3.8% from last month</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex flex-col ">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-green-400">+12,234</h2>
            </CardContent>
            <CardFooter>
              <p className="text-gray-400">+19% from last month</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex flex-col  ">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Active now</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-green-400">+537</h2>
            </CardContent>
            <CardFooter>
              <p className="text-gray-400">+201 from last month</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <ChartComponent />
      </div>
      {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
