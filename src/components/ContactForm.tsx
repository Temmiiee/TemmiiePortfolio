"use client";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function submitAction(_data: z.infer<typeof formSchema>) {
  // In a real app, you'd send this data to a backend API, email service, etc.
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Message envoyé avec succès !" };
}

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitAction(values);
    if (result.success) {
      toast({
        title: "Succès !",
        description: result.message,
      });
      form.reset();
    } else {
        toast({
            title: "Erreur",
            description: "Une erreur est survenue. Veuillez réessayer.",
            variant: "destructive",
        })
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle id="form-title" className="font-headline text-2xl">Envoyer un message</CardTitle>
            <CardDescription>Remplissez le formulaire ci-dessous.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-labelledby="form-title">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                        <Input placeholder="Votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="votre.email@exemple.com" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Votre message..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
