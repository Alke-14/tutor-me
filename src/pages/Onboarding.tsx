import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { UserData } from "@/models/userData";

function Onboarding() {
  // variable for form data. gets saved to browser on save
  const [userData, setUserData] = useState<UserData>({
    subject: "",
    learningPace: "",
    confidenceLevel: "",
    learningStyles: [],
    disabilities: [],
    otherDisabilities: "",
  });

  const [otherSubject, setOtherSubject] = useState(false);
  const [otherDisability, setOtherDisability] = useState(false);

  const navigate = useNavigate();

  // Handles change for all form inputs apart for subject
  const handleChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles change for checkbox inputs
  const handleCheckboxChange = (
    name: string,
    value: string,
    isChecked: boolean
  ) => {
    setUserData((prevData) => {
      // get current array
      const currentArray = prevData[name as keyof typeof prevData] as string[];

      // if the checkbox is checked, add to array
      if (isChecked) {
        return {
          ...prevData,
          [name]: [...currentArray, value],
        };
      }
      // else, remove from array
      else {
        return {
          ...prevData,
          [name]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Submitting to Local Storage");
    e.preventDefault();

    const userDataString = JSON.stringify(userData);

    localStorage.setItem("userData", userDataString);

    navigate("/");
  };

  // Current issues:
  // - lets user submit despite certain options being
  // if we ever come back to this project, we should consider replacing this with React Hook Form.
  return (
    <div className="h-fit align-center flex items-center justify-center">
      <Card className="w-full max-w-sm ml-auto mr-auto mt-10" id="form">
        <CardHeader>
          <CardTitle>Welcome to tutor.me!</CardTitle>
          <CardDescription>
            First, let's get to know you a little better!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Subject */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  name="subject"
                  required
                  onValueChange={(value: string) => {
                    if (value === "other") {
                      setOtherSubject(true);
                    } else {
                      setOtherSubject(false);
                    }

                    setUserData((prevData) => ({
                      ...prevData,
                      subject: value,
                    }));
                    console.log(userData);
                  }}
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
                {otherSubject && (
                  <div className="grid gap-2">
                    <Label htmlFor="other-subject">Other Subject</Label>
                    <Input
                      id="other-subject"
                      name="subject"
                      type="text"
                      placeholder="If other, please specify"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>

              {/* Learning Pace */}
              <div className="grid gap-2">
                <Label htmlFor="learn-pace">What is your learning pace?</Label>
                <RadioGroup
                  name="learningPace"
                  required
                  defaultValue=""
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.name, e.target.value)
                  }
                >
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

              {/* Confidence */}
              <div className="grid gap-2">
                <Label htmlFor="preferred-learning-style">
                  How confident are you in this topic?
                </Label>
                <Select
                  required
                  onValueChange={(value: string) =>
                    handleChange("confidenceLevel", value)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Confidence Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-confident">
                      Very Confident
                    </SelectItem>
                    <SelectItem value="somewhat-confident">
                      Somewhat Confident
                    </SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="not-very-confident">
                      Not Very Confident
                    </SelectItem>
                    <SelectItem value="not-confident">Not Confident</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Learning Style */}
              <div className="grid gap-2">
                <Label htmlFor="preferred-learning-style">
                  Preferred Learning Style
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visual"
                    checked={userData.learningStyles.includes("visual")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(
                        "learningStyles",
                        "visual",
                        !!checked
                      );
                    }}
                  />
                  <Label htmlFor="visual">Visual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="auditory"
                    checked={userData.learningStyles.includes("auditory")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(
                        "learningStyles",
                        "auditory",
                        !!checked
                      );
                    }}
                  />
                  <Label htmlFor="auditory">Auditory</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="kinesthetic"
                    checked={userData.learningStyles.includes("kinesthetic")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(
                        "learningStyles",
                        "kinesthetic",
                        !!checked
                      );
                    }}
                  />
                  <Label htmlFor="kinesthetic">Kinesthetic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="examples"
                    checked={userData.learningStyles.includes("examples")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(
                        "learningStyles",
                        "examples",
                        !!checked
                      );
                    }}
                  />
                  <Label htmlFor="examples">Example Problems</Label>
                </div>
              </div>

              {/* Disabilities */}
              <div className="grid gap-2 pb-2">
                <Label htmlFor="preferred-learning-style">
                  Learning Disabilities
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dyslexia"
                    checked={userData.disabilities.includes("dyslexia")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "disabilities",
                        "dyslexia",
                        !!checked
                      )
                    }
                  />
                  <Label htmlFor="dyslexia">Dyslexia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ADHD"
                    checked={userData.disabilities.includes("ADHD")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("disabilities", "ADHD", !!checked)
                    }
                  />
                  <Label htmlFor="ADHD">ADHD</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autism"
                    checked={userData.disabilities.includes("autism")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("disabilities", "autism", !!checked)
                    }
                  />
                  <Label htmlFor="autism">Autism</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dysgraphia"
                    checked={userData.disabilities.includes("dysgraphia")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "disabilities",
                        "dysgraphia",
                        !!checked
                      )
                    }
                  />
                  <Label htmlFor="dysgraphia">Dysgraphia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dyscalculia"
                    checked={userData.disabilities.includes("dyscalculia")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "disabilities",
                        "dyscalculia",
                        !!checked
                      )
                    }
                  />
                  <Label htmlFor="dyscalculia">Dyscalculia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={otherDisability}
                    onCheckedChange={(checked) => {
                      setOtherDisability(!!checked);

                      // if it isn't checked, clear otherDisabilities field in json
                      if (!checked) {
                        handleChange("otherDisabilities", "");
                      }
                    }}
                  />
                  <Label htmlFor="other">Other</Label>
                </div>

                {/* if user selects other disability */}
                {otherDisability && (
                  <Input
                    id="other-condition"
                    type="text"
                    placeholder="If other disability, please specify"
                    name="otherDisabilities"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                )}
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Onboarding;
