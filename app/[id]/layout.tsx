function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>layout</p>
      {children}
    </div>
  );
}

export default layout;
