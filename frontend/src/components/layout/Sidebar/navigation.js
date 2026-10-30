import {
    ShoppingCartIcon,
    ClipboardDocumentListIcon,
    Squares2X2Icon,
    CubeIcon,
    UsersIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
    {
        name: "Registrar Venta",
        path: "/",
        icon: ShoppingCartIcon,
    },
    {
        name: "Historial de Ventas",
        path: "/ventas",
        icon: ClipboardDocumentListIcon,
    },
    {
        name: "Categorías",
        path: "/categorias",
        icon: Squares2X2Icon,
    },
    {
        name: "Productos",
        path: "/productos",
        icon: CubeIcon,
    },
    {
        name: "Usuarios",
        path: "/usuarios",
        icon: UsersIcon,
    },
    {
        name: "Auditoría",
        path: "/auditoria",
        icon: DocumentTextIcon,
    },
];