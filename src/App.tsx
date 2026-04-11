import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalCursor from "./components/GlobalCursor";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index.tsx";
import PartnerWithUs from "./pages/PartnerWithUs.tsx";
import NotFound from "./pages/NotFound.tsx";
import NotesFromTheRoom from "./pages/NotesFromTheRoom.tsx";
import WhenTheBodyKnowsFirst from "./pages/WhenTheBodyKnowsFirst.tsx";
import ThreeStoriesAtOnce from "./pages/ThreeStoriesAtOnce.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalCursor />
        <PageTransition />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partner" element={<PartnerWithUs />} />
          <Route path="/notes-from-the-room" element={<NotesFromTheRoom />} />
          <Route path="/notes-from-the-room/when-the-body-knows-first" element={<WhenTheBodyKnowsFirst />} />
          <Route path="/notes-from-the-room/three-stories-at-once" element={<ThreeStoriesAtOnce />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
