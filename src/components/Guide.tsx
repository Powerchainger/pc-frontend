import React, { useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faMagnifyingGlass, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Typography } from "@material-tailwind/react";

const GUIDE_SHOWN_FLAG = "guideShown";

const steps = [
    "The essence of our dashboard lies in its cutting-edge AI algorithm called Edge, which offers unparalleled appliance detection and consumption forecasting. " +
    "With real-time feedback on your energy usage, Edge seamlessly integrates with your energy supplier's app, " +
    "empowering you to act energy-efficiently and witness immediate energy and cost savings. By harnessing Edge's potential, you can even store surplus energy in a home battery, " +
    "playing a pivotal role in balancing the grid. Our dashboard ensures a smooth transition towards a greener future by allowing energy sharing with households in need, " +
    "making sustainability accessible and rewarding for all.",
    "At the home page, you can view various infographics representing your household's consumption. These infographics provide insights into your total energy consumption, gas usage, and solar panel generation.\n" +
    "On the devices page, the dashboard presents a detailed overview of the devices in your household and whether they are turned on or off. This information is generated based on the AI-powered predictions derived from your total household consumption data.\n" +
    "With the dashboard's advanced features, you can proactively manage your energy usage, optimize your appliance usage patterns, and make informed decisions to maximize energy efficiency.",
    "Let's get started! With the dashboard's advanced features, you can proactively manage your energy usage, optimize your appliance usage patterns, " +
    "and make informed decisions to maximize energy efficiency. It's time to take control of your energy consumption and play a role in creating a greener future. " +
    "Start using our dashboard today and be a part of the sustainable energy revolution!",
];

export default function Guide() {
    const [isGuideOpen, setIsGuideOpen] = React.useState(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const [showAgain, setShowAgain] = React.useState(true);

    useEffect(() => {
        // Check if the guide has been shown before
        const guideShown = localStorage.getItem(GUIDE_SHOWN_FLAG);
        if (guideShown) {
            // If the guide has been shown before, close it
            setIsGuideOpen(false);
        }
    }, []);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleTryIt = () => {
        if (isLastStep) {
            setIsGuideOpen(false); // Close the guide
            // Save the value of the checkbox in localStorage
            if (!showAgain) {
                localStorage.setItem(GUIDE_SHOWN_FLAG, "true");
            }
        } else {
            handleNext();
        }
    };

    const closeGuide = () => {
        setIsGuideOpen(false);
    }

    if (!isGuideOpen) {
        if (!showAgain) {
            localStorage.setItem(GUIDE_SHOWN_FLAG, "true");
        }

        return null;
    }

    return (
        <>
            <div className="w-3/4 h-3/4 py-4 px-8 shadow-xl rounded-xl bg-white">
                <button className="ml-auto text-gray-500 inline-flex" onClick={closeGuide}>
                    <FontAwesomeIcon icon={faX} className="h-5 w-5" />
                </button>
                <div className="p-8 mb-16 mx-auto">
                    <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">
                        HOW IT WORKS
                    </Typography>
                    <Typography>{steps[activeStep]}</Typography>
                </div>
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <FontAwesomeIcon icon={faBolt} className="h-5 w-5" />
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
                    </Step>
                    <Step onClick={() => setActiveStep(2)}>
                        <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                    </Step>
                </Stepper>
                <div className="mt-16 flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                        Prev
                    </Button>
                    <div className="flex">
                        <input
                            type="checkbox"
                            id="showAgainCheckbox"
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            checked={!showAgain}
                            onChange={() => setShowAgain(!showAgain)}
                        />
                        <label htmlFor="showAgainCheckbox" className="ml-2 text-sm text-gray-600">
                            Don't show again
                        </label>
                    </div>
                    <Button onClick={handleTryIt}>
                        {isLastStep ? "Try it!" : "Next"}
                    </Button>
                </div>
            </div>
        </>
    );
}