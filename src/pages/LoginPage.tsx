import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/lib/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/leaveRequest";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: () => navigate("/dashboard"),
  });
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate(data);
  };

  const apiError = isError
    ? (error as AxiosError<ApiError>)?.response?.data
    : null;

  return (
    <Card>
      <CardHeader>Login to your account</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} id="email" type="email" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input {...register("password")} id="password" type="password" />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Button disabled={isSubmitting || isPending} type="submit">
              Login
            </Button>
          </div>
        </form>
        {apiError && <p className="text-red-500 text-sm">{apiError.detail}</p>}
      </CardContent>
    </Card>
  );
}
