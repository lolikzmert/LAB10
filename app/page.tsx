"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Download, QrCode } from "lucide-react"

export default function QRGeneratorPage() {
  const [text, setText] = useState("Иванов Иван Иванович")
  const [qrSize, setQrSize] = useState(256)
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = url
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <QrCode className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">QR Генератор</h1>
              <p className="text-sm text-muted-foreground">Создание QR-кодов онлайн</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Text Input */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-input" className="text-base font-semibold">
                  Введите текст
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Введите текст, URL или любую информацию для генерации QR-кода
                </p>
              </div>

              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст для QR-кода..."
                className="min-h-[400px] resize-none font-mono text-sm"
              />

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Символов:</strong> {text.length}
                </p>
              </div>
            </div>
          </Card>

          {/* Right Panel - QR Code Display */}
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Ваш QR-код</Label>
                <p className="text-sm text-muted-foreground mt-1">Настройте размер и скачайте готовый QR-код</p>
              </div>

              {/* QR Code Display */}
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                {text ? (
                  <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-sm">
                    <QRCodeCanvas value={text} size={qrSize} level="H" includeMargin={true} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <QrCode className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">Введите текст для генерации QR-кода</p>
                  </div>
                )}
              </div>

              {/* Size Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="size-slider">Размер QR-кода</Label>
                  <span className="text-sm font-mono text-muted-foreground">{qrSize}px</span>
                </div>
                <Slider
                  id="size-slider"
                  value={[qrSize]}
                  onValueChange={(value) => setQrSize(value[0])}
                  min={128}
                  max={512}
                  step={32}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>128px</span>
                  <span>512px</span>
                </div>
              </div>

              {/* Download Button */}
              <Button onClick={downloadQR} disabled={!text} className="w-full" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Скачать PNG
              </Button>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-accent">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-accent-foreground">О приложении</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Это Progressive Web Application (PWA) для генерации QR-кодов. Приложение работает офлайн после первой
              загрузки и может быть установлено на ваше устройство. Все данные обрабатываются локально в вашем браузере.
            </p>
          </div>
        </Card>
      </main>
    </div>
  )
}
