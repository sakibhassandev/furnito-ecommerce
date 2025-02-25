import { Eye, MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type ProductImage = {
  id: string;
  color: string;
  url: string[];
  productId: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  categories: string[];
  tags: string[];
  hasDiscount: number | null;
  sizes: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type UserAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  address: UserAddress[];
};

type Order = {
  id: string;
  orderItems: OrderItem[];
  user: User;
  paymentMethod: string;
  total: number;
  status: "pending" | "delivered" | "cancelled";
  trackingNumber: string;
  orderDate: string;
};

export default function AdminDashboardRecentOrders({
  orders,
}: {
  orders: Order[];
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Showing latest 10 orders</CardDescription>
        </div>
        <Button
          onClick={() => {
            router.push("/admin/orders");
          }}
          variant="outline"
          size="sm"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...orders]
              .reverse()
              .slice(0, 10)
              .map((order) => (
                <TableRow key={order.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />#
                      {order.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order?.user?.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {order?.user?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {order.orderItems.length} items
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString("en-Gb")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                        asChild
                      >
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View order details</span>
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              window.location.href = `mailto:${order.user.email}`;
                            }}
                          >
                            Contact Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
