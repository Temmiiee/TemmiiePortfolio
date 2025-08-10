"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateProjectIdea, ProjectIdeaOutput } from "@/ai/flows/idea-generator-flow";
import { Loader, Wand2, Lightbulb, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Veuillez décrire votre projet en 10 caractères minimum.",
  }),
});

export function ProjectIdeaGenerator() {
  const [idea, setIdea] = useState<ProjectIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setIdea(null);
    try {
      const result = await generateProjectIdea(values);
      setIdea(result);
    } catch (e) {
      console.error(e);
      setError("Désolé, une erreur est survenue lors de la génération de l'idée.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Description de votre projet</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Je suis un artisan chocolatier et je souhaite vendre mes créations en ligne..."
                      className="min-h-[100px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Suggérer une idée
                </>
              )}
            </Button>
          </form>
        </Form>

        {error && <p className="text-destructive text-center mt-4">{error}</p>}
        
        {idea && (
          <div className="mt-6 border-t pt-6 animate-fade-in-down">
            <h3 className="font-headline text-2xl font-bold text-center text-primary mb-4 flex items-center justify-center gap-2">
              <Lightbulb className="h-7 w-7"/>
              Votre Concept de Site Web
            </h3>
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle>{idea.title}</CardTitle>
                    <CardDescription>{idea.concept}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="font-bold mb-2">Fonctionnalités Clés :</h4>
                    <ul className="space-y-2">
                        {idea.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
