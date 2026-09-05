interface PrivatePageLayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: PrivatePageLayoutProps) => {
    return <div>{children}</div>;
};

export default layout;
