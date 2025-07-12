import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem  } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "./components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/ui/card";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] typewriter">
        <h1 className="text-6xl md:text-9xl ">tutor.me</h1>
        <p className="text-2xl md:text-4xl mt-4">
          Your personalized learning assistant!
        </p>
        <Button className="text-xl mt-5 classyBtn" onClick={() => {
          // Handle button click, and checker
          console.log("Get Started clicked");
          document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
        }}>
          Get Started
        </Button>
      </div>
      <div className="h-[100vh] align-center flex items-center justify-center">
        <Card className="w-full max-w-sm ml-auto mr-auto mt-10" id="form">
          <CardHeader>
            <CardTitle>Welcome to tutor.me!</CardTitle>
            <CardDescription>
              First, let's get to know you a little better!
            </CardDescription>
            
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    onValueChange={(value) => setSubject(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select a Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {subject === "other" && (
                    <div className="grid gap-2">
                      <Label htmlFor="other-subject">Other Subject</Label>
                      <Input 
                        id="other-subject" 
                        type="text" 
                        placeholder="If other, please specify" 
                      />
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="learn-pace">What is your learning pace?</Label>
                  <RadioGroup defaultValue="">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Fast" id="fast" />
                      <Label htmlFor="fast">Fast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Slow" id="slow" />
                      <Label htmlFor="slow">Slow</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="preferred-learning-style">How confident are you in this topic?</Label>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Confidence Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-confident">Very Confident</SelectItem>
                      <SelectItem value="somewhat-confident">Somewhat Confident</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="not-very-confident">Not Very Confident</SelectItem>
                      <SelectItem value="not-confident">Not Confident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="preferred-learning-style">Preferred Learning Style</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="visual" />
                    <Label htmlFor="visual">Visual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auditory" />
                    <Label htmlFor="auditory">Auditory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="kinesthetic" />
                    <Label htmlFor="kinesthetic">Kinesthetic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="examples" />
                    <Label htmlFor="examples">Example Problems</Label>
                  </div>  
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="preferred-learning-style">Learning Disabilities</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dyslexia" />
                    <Label htmlFor="dyslexia">Dyslexia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ADHD" />
                    <Label htmlFor="ADHD">ADHD</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="autism" />
                    <Label htmlFor="autism">Autism</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dysgraphia" />
                    <Label htmlFor="dysgraphia">Dysgraphia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dyscalculia" />
                    <Label htmlFor="dyscalculia">Dyscalculia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="other" 
                      checked={condition}
                      onCheckedChange={(checked) => setCondition(!!checked)} 
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                  {condition && (
                    <Input 
                      id="other-condition" 
                      type="text" 
                      placeholder="If other disability, please specify" 
                    />
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card> 
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
