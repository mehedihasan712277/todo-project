import { useTodo } from "@/components/provider/TodoContext";
import { PenBox, Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GetTodo = () => {
    const { todo } = useTodo();
    const handleDelete = () => {
        toast.success("Task deleted successfully");
    };
    return (
        <div>
            <p className="sticky top-24 bg-background">Total{todo.length}</p>
            <div className="space-y-2">
                {todo.map((ele) => {
                    return (
                        <div key={ele.id} className="p-4 border">
                            <p className="font-bold">{ele.title}</p>
                            <p className="text-foreground">{ele.body}</p>
                            <div className="flex justify-end gap-2">
                                <PenBox size={20}></PenBox>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">
                                            <Trash2
                                                size={20}
                                                className="text-red-400"
                                            ></Trash2>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your account from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                variant={"destructive"}
                                                onClick={() => handleDelete()}
                                            >
                                                Deelete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GetTodo;
