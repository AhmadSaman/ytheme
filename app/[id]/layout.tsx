function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen justify-center items-center bg-zinc-800">
      {children}
    </div>
  );
}

export default layout;
