import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Eye, Play, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodePreview = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const { toast } = useToast();

  const sampleCode = `import React from 'react';
import { Button } from '@/components/ui/button';

const WelcomeComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center space-y-6 p-8 glass rounded-2xl">
        <h1 className="text-4xl font-bold text-white">
          Welcome to AI Code Editor
        </h1>
        <p className="text-lg text-gray-300 max-w-md">
          Build amazing applications with the power of AI assistance
        </p>
        <Button className="gradient-ai shadow-ai">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default WelcomeComponent;`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
    });
  };

  return (
    <div className="flex flex-col h-full glass rounded-xl border border-ai-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-ai-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ai-surface-elevated rounded-lg flex items-center justify-center">
            <Code2 className="w-4 h-4 text-ai-purple" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Code Preview</h2>
            <p className="text-sm text-muted-foreground">Live preview & editor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 glass border-ai-border-subtle m-4 mb-0">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Code
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 p-4">
          <TabsContent value="preview" className="h-full mt-0">
            <div className="h-full bg-ai-surface-elevated rounded-lg border border-ai-border-subtle overflow-hidden">
              <div className="h-full flex items-center justify-center gradient-ai-subtle">
                <div className="text-center space-y-6 p-8 glass rounded-2xl max-w-md">
                  <div className="w-16 h-16 gradient-ai rounded-full flex items-center justify-center mx-auto animate-float">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome to AI Code Editor
                  </h1>
                  <p className="text-muted-foreground">
                    Build amazing applications with the power of AI assistance
                  </p>
                  <Button className="gradient-ai shadow-ai hover:animate-glow">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="h-full mt-0">
            <ScrollArea className="h-full bg-ai-surface-elevated rounded-lg border border-ai-border-subtle">
              <pre className="p-4 text-sm">
                <code className="text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                  {sampleCode}
                </code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CodePreview;