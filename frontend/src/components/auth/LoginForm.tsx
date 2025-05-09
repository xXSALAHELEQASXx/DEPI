import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import LinkifyLogo from "../ui/LinkifyLogo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
  setIsLoading(true);
  try {
    // call your backend‑connected login()
    await login(values.email, values.password);
    navigate("/dashboard");
  } catch (error) {
    toast({
      title: "Login failed",
      description: t("errors.invalidCredentials"),
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <LinkifyLogo className="h-16 w-auto" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("auth.welcome")}
          </h2>
        </div>

        <div className="mt-8 bg-card p-8 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder={t("common.email")}
                          {...field}
                          type="email"
                          disabled={isLoading}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder={t("common.password")}
                          {...field}
                          type="password"
                          disabled={isLoading}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-linkify hover:bg-linkify-dark gap-2 h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  t("common.loading")
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    {t("auth.loginButton")}
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.newUser")}{" "}
              <Link to="/register" className="text-primary hover:underline">
                {t("auth.createAccount")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
