import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ title, body });

        toast.success("Todo created successfully");

        setTitle("");
        setBody("");
    };

    return (
        <Card className="w-full max-w-md sticky top-24">
            <CardHeader>
                <CardTitle>Create Todo</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCreateTodo} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            placeholder="Enter title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body">Body</Label>
                        <Input
                            id="body"
                            value={body}
                            placeholder="Enter body"
                            required
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateTodo;
