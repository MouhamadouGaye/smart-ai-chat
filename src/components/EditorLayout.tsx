import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Settings,
  FileCode,
  Palette,
  Zap,
  Menu,
  X,
} from "lucide-react";
import ChatInterface from "./ChatInterface";
import CodePreview from "./CodePreview";

const EditorLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Top Navigation */}
      <div className="h-14 border-b border-ai-border-subtle glass flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden"
          >
            {sidebarCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center animate-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gradient">
                AI Code Editor
              </h1>
              <a href="http://localhost:5000/ai.html"> ai2</a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <FileCode className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Themes</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="default"
            size="sm"
            className="gradient-ai shadow-ai gap-2"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Upgrade</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Chat Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-0 lg:w-96" : "w-full lg:w-96"
          } transition-all duration-300 border-r border-ai-border-subtle flex-shrink-0 ${
            sidebarCollapsed ? "overflow-hidden lg:overflow-visible" : ""
          }`}
        >
          <div className="h-full p-4">
            <ChatInterface />
          </div>
        </div>

        {/* Code Preview Area */}
        <div
          className={`flex-1 ${sidebarCollapsed ? "block" : "hidden lg:block"}`}
        >
          <div className="h-full p-4">
            <CodePreview />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-ai-border-subtle glass flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Ready</span>
          <Separator orientation="vertical" className="h-4" />
          <span>TypeScript</span>
          <Separator orientation="vertical" className="h-4" />
          <span>React</span>
        </div>
        <div className="flex items-center gap-4">
          <span>AI Assistant Active</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
