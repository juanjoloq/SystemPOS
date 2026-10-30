import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import {
    Button,
    Card,
    Input,
} from "../../components/ui";

function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            await login(formData);

            toast.success("Bienvenido");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                "Error al iniciar sesión."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-app">

            <Card className="w-full max-w-md">

                <h1 className="mb-6 text-center text-2xl font-bold">
                    Iniciar sesión
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <Input
                        label="Usuario"
                        error={errors.usuario?.message}
                        {...register("usuario", {
                            required: "El usuario es obligatorio.",
                        })}
                    />

                    <Input
                        type="password"
                        label="Contraseña"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "La contraseña es obligatoria.",
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Ingresando..."
                            : "Ingresar"}
                    </Button>

                </form>

            </Card>

        </div>
    );
}

export default LoginPage;