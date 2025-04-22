import { AiAssistant } from "@/components/ai-assistant/ai-assistant";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { ShinyButton } from "@/components/ui/shiny-button";


export default function ComponentPage() {
  return (
    <div>
      <h1>Components Page</h1>
      <div>
        <h2>Header</h2>
        <AiAssistant />
      </div>
      <div>
        <h2>Button</h2>
        <ShinyButton>Click me</ShinyButton>
      </div>
      <div>
        <h2>Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <GradientButton>Click me</GradientButton>
          </CardHeader>
        </Card>
      </div>
      <div>
        <h2>Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <GradientButton variant="variant">Click me</GradientButton>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}