import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FileVideo, Upload } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }

    // convert video em audio
    // this will be implemented on the front-side because if it was in back-end side it would execute in the server. Imagine 1000 people try to do this operation at the same time. It would be heavy. It will be executed on the front because it's going to execute on the user browser.
    
  }

  // Allows a video preview
  // useMemo will monitor if the [videoFile] change
  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
    // this return will create a preview of the selected video.
  }, [videoFile]);

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label 
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
        {previewURL ? (
          <video 
            src={previewURL}
            controls={false} 
            className="pointer-events-none absolute inset-0"/>
          ) : (
          <>
          <FileVideo 
            className="w-4 h-4"
          />
          Selecione um vídeo
          </>
        )}
      </label>

      <input 
        type="file" 
        id="video" 
        accept="video/mp4" 
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcriptionPrompt">Prompt de transcrição</Label>
        <Textarea 
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras mencionadas no vídeo separadas por vírgula (,)"/>
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};