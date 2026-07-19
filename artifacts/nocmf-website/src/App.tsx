import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Members from "@/pages/Members";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Supporters from "@/pages/Supporters";
import { DonationProvider } from "@/contexts/DonationContext";
import { DonationModal } from "@/components/DonationModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={EventDetail} />
      <Route path="/members" component={Members} />
      <Route path="/supporters" component={Supporters} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DonationProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <DonationModal />
          <Toaster />
        </DonationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
