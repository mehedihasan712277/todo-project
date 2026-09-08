"use client";
import { Todo } from "@/utils/type";
import react, { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
    todo: Todo[];
}

export const Context = createContext<ContextType | undefined>(undefined);

export const TodoContext = ({ children }: { children: react.ReactNode }) => {
    const [data, setData] = useState<Todo[]>([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    const info: ContextType = {
        todo: data,
    };

    return <Context.Provider value={info}>{children}</Context.Provider>;
};

export const useTodo = () => {
    const data = useContext(Context);
    if (!data) {
        throw new Error("something went wrong");
    }
    return data;
};
