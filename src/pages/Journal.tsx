import { useState } from "react";
import { Plus, Search, Calendar, Smile, Meh, Frown, Save, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "March 15, 2025",
      mood: "😊",
      title: "A Productive Day",
      content: "Today was incredibly productive. I managed to complete two major tasks that I've been postponing for a while. The sense of accomplishment is wonderful...",
      preview: "Today was incredibly productive. I managed to complete two major tasks...",
    },
    {
      id: 2,
      date: "March 14, 2025",
      mood: "😐",
      title: "Feeling Overwhelmed",
      content: "The deadlines are piling up and I'm feeling a bit overwhelmed. Need to remember to take breaks and not be too hard on myself. Tomorrow is a new day...",
      preview: "The deadlines are piling up and I'm feeling a bit overwhelmed...",
    },
    {
      id: 3,
      date: "March 13, 2025",
      mood: "😄",
      title: "Team Success",
      content: "Had a wonderful meeting with the team today. Everyone was engaged and we came up with some brilliant ideas for the project. Collaboration at its finest...",
      preview: "Had a wonderful meeting with the team today. Everyone was engaged...",
    },
  ]);

  const [selectedEntry, setSelectedEntry] = useState(entries[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const moods = [
    { value: "😄", label: "Happy" },
    { value: "😊", label: "Content" },
    { value: "😐", label: "Neutral" },
    { value: "😔", label: "Sad" },
    { value: "😢", label: "Very Sad" },
  ];

  const handleSaveEntry = () => {
    toast.success("Entry saved successfully!");
    setIsEditing(false);
  };

  const handleDeleteEntry = () => {
    toast.success("Entry deleted");
  };

  const handleNewEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }),
      mood: "😊",
      title: "Untitled Entry",
      content: "",
      preview: "",
    };
    setEntries([newEntry, ...entries]);
    setSelectedEntry(newEntry);
    setIsEditing(true);
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Entries List Sidebar */}
      <div className="w-80 border-r border-border bg-card/50 flex flex-col">
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground">Journal</h2>
            <Button
              size="icon"
              className="bg-crimson hover:bg-crimson/90 shadow-crimson"
              onClick={handleNewEntry}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              className="pl-10 bg-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-muted-foreground font-serif italic">
                  Your story begins here...
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-violet text-violet hover:bg-violet/10"
                  onClick={handleNewEntry}
                >
                  Write Your First Entry
                </Button>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className={`cursor-pointer transition-all hover:shadow-violet ${
                    selectedEntry?.id === entry.id
                      ? "bg-secondary border-violet shadow-violet"
                      : "bg-card border-border"
                  }`}
                  onClick={() => {
                    setSelectedEntry(entry);
                    setIsEditing(false);
                  }}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.mood}</span>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {entry.date}
                        </p>
                      </div>
                    </div>
                    <h3 className="font-serif font-semibold text-foreground line-clamp-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {entry.preview}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Entry Content */}
      <div className="flex-1 flex flex-col">
        {selectedEntry ? (
          <>
            {/* Entry Header */}
            <div className="p-6 border-b border-border bg-card/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {isEditing ? (
                    <Select defaultValue={selectedEntry.mood}>
                      <SelectTrigger className="w-[80px] bg-secondary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {moods.map((mood) => (
                          <SelectItem key={mood.value} value={mood.value}>
                            <span className="text-xl">{mood.value}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-4xl">{selectedEntry.mood}</span>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedEntry.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        className="border-border"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-crimson hover:bg-crimson/90"
                        onClick={handleSaveEntry}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10"
                        onClick={handleDeleteEntry}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button
                        className="bg-violet hover:bg-violet/90"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <Input
                  className="font-serif text-3xl font-bold bg-secondary/50 border-border"
                  defaultValue={selectedEntry.title}
                  placeholder="Entry title..."
                />
              ) : (
                <h1 className="font-serif text-4xl font-bold text-foreground">
                  {selectedEntry.title}
                </h1>
              )}
            </div>

            {/* Entry Content */}
            <ScrollArea className="flex-1 p-6">
              {isEditing ? (
                <Textarea
                  className="min-h-[500px] parchment-texture border-border font-serif text-lg resize-none"
                  defaultValue={selectedEntry.content}
                  placeholder="Begin your reflection..."
                />
              ) : (
                <div className="parchment-texture rounded-lg p-8 shadow-sm border border-border">
                  <p className="font-serif text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
              <h3 className="font-serif text-2xl text-foreground">Select an entry</h3>
              <p className="text-muted-foreground">
                Choose an entry from the list or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
