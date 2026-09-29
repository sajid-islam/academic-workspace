"use client";

import * as React from "react";
import { FolderSimpleStar, LinkSimple } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { ResourceType } from "@/types/resource";

interface AddResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddResourceDialog({ open, onOpenChange }: AddResourceDialogProps) {
  const { subjects, addResource, student } = useWorkspace();
  const { toast } = useToast();

  const [subjectId, setSubjectId] = React.useState(subjects[0]?.id || "sub-cse1101");
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState<ResourceType>("website");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tagsText, setTagsText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      toast({
        title: "Required Fields",
        description: "Please provide a resource title and URL.",
        type: "error",
      });
      return;
    }

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    addResource({
      subjectId,
      title: title.trim(),
      type,
      url: url.trim(),
      description: description.trim() || "Recommended learning resource for course study.",
      addedBy: student.name,
      addedByRoll: student.roll,
      tags: tags.length > 0 ? tags : ["Reference", "Study Tool"],
      status: "Approved",
    });

    onOpenChange(false);
    toast({
      title: "Resource Added!",
      description: `"${title}" has been saved to the shared learning library.`,
      type: "success",
    });

    // Reset
    setTitle("");
    setUrl("");
    setDescription("");
    setTagsText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary">Learning Library</span>
          </div>
          <DialogTitle className="text-lg font-bold text-foreground mt-0.5">
            Add Learning Resource
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share textbooks, video playlists, web tools, or documentation with your batch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Course Subject <span className="text-rose-500">*</span>
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
              required
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code}: {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Resource Title <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="e.g. Neso Academy Digital Logic Playlist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Resource Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ResourceType)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="video">YouTube Video</option>
                <option value="playlist">YouTube Playlist</option>
                <option value="website">Website / Interactive Tool</option>
                <option value="book">Prescribed Textbook</option>
                <option value="pdf">PDF Document / Reference</option>
                <option value="document">Documentation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Destination URL <span className="text-rose-500">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Brief Description
            </label>
            <Textarea
              placeholder="Why this resource is useful for this course..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Tags (comma separated)
            </label>
            <Input
              placeholder="e.g. K-Maps, Video, Full Playlist"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <DialogFooter className="pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <FolderSimpleStar className="size-4" />
              <span>Save Resource</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
