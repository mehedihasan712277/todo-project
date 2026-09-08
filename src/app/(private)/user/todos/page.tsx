"use client";

import CreateTodo from "./_components/CreateTodo";
import GetTodo from "./_components/GetTodo";

const TodoPage = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <CreateTodo></CreateTodo>
            </div>
            <div>
                <GetTodo></GetTodo>
            </div>
        </div>
    );
};

export default TodoPage;
