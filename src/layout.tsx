export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[url('/placeholder.svg')] bg-cover bg-center">
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

