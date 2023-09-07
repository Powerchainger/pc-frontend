import React, { useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBolt, faMagnifyingGlass, faCheck, faX, faCogs, faBell, faSmile, faHome} from '@fortawesome/free-solid-svg-icons'
import { Typography } from "@material-tailwind/react";

const GUIDE_SHOWN_FLAG = "guideShown";

const steps = [
    {
        title: <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">HOW IT WORKS</Typography>,
        content: (
            <Typography>
                Welcome to your <span className='text-blue-500'>smart energy dashboard</span>! Our mission is to empower you with the tools to understand and manage your energy consumption effectively. We use <span className='text-blue-500'>cutting-edge AI technology</span> to analyze your energy usage patterns and provide actionable insights. This helps you make smarter choices, reduce your bills, and even lower your carbon footprint. So, how does it work? We collect data from your smart devices and run it through our algorithms to give you a real-time overview of your energy consumption. Get insights on your daily energy consumption on the homepage!
            </Typography>
        ),
        icon: faBolt
    },
    {
        title: <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">PREDICTIONS</Typography>,
        content: (
            <Typography>
                The <span className='text-blue-500'>Predictions</span> tab is where the magic happens. Here, you'll see bubbles that represent each of your household devices. The size of these bubbles correlates with the device's energy consumption. Devices with <span className='text-red-500'>red bubbles</span> are the energy hogs you'll want to keep an eye on. Below these bubbles, you'll find a <span className='text-blue-500'>list of devices</span>. This list offers more details, like energy consumption patterns and operational status. If you've selected the ConvexOpt model, each device in the list will also feature a <span className='text-blue-500'>feedback button</span> to help refine the model's predictions. Clicking on a device will reveal a <span className='text-blue-500'>graph</span> that plots its energy usage over time, helping you understand its consumption patterns better.
            </Typography>
        ),
        icon: faMagnifyingGlass
    },
    {
        title: <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">MODELS</Typography>,
        content: (
            <Typography>
                We employ two primary <span className='text-blue-500'>models</span> for our energy consumption predictions: <span className='yellow'>FHMM (Factorial Hidden Markov Model)</span> and <span className='yellow'>ConvexOpt (Convex Optimization)</span>. FHMM is a quicker but less accurate model, ideal for getting a general idea of your energy usage. It doesn't use feedback for its predictions. On the other hand, ConvexOpt is more accurate but takes a bit longer to process. It's this model that benefits from your feedback to improve its accuracy. You can switch between these models in the <span className='text-blue-500'>settings</span>, accessible via the gear icon on the top right of your dashboard.
            </Typography>
        ),
        icon: faCogs
    },
    {
        title: <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">NOTIFICATIONS</Typography>,
        content: (
            <Typography>
                Notifications appear when a device that was previously off gets turned on and is measured at <span className='text-red-500'>above 700 watts</span>. These <span className='text-red-500'>high consumption</span> alerts are your cue to take immediate action. They help you identify devices that might be consuming more energy than they should. You can then decide whether to turn them off, adjust their settings, or investigate further. Think of these notifications as your personal energy watchdogs, always on the lookout to help you save money and energy.
            </Typography>
        ),
        icon: faBell
    },
    {
        title: <Typography variant="h4" component="h2" fontWeight="bold" align="center" className="p-4">GOOD LUCK</Typography>,
        content: (
            <Typography>
                Remember, you can always view this guide again by pressing the <span className='text-blue-500'>infographic</span> button on the top right of your dashboard. Good luck on your journey to smarter energy management!
            </Typography>
        ),
        icon: faSmile
    }
];










export default function Guide(props: { onClose?: () => void, forceShow?: boolean }) {
    const [isGuideOpen, setIsGuideOpen] = React.useState(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const [showAgain, setShowAgain] = React.useState(true);

    useEffect(() => {
        if (props.forceShow) {
            setIsGuideOpen(true);
            return;
        }

        const guideShown = localStorage.getItem(GUIDE_SHOWN_FLAG);
        if (guideShown) {
            setIsGuideOpen(false);
        }
    }, [props.forceShow]);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleTryIt = () => {
        if (isLastStep) {
            setIsGuideOpen(false);
            if (props.onClose) {
                props.onClose();
            }
            if (!showAgain) {
                localStorage.setItem(GUIDE_SHOWN_FLAG, "true");
            }
        } else {
            handleNext();
        }
    };

    const closeGuide = () => {
        setIsGuideOpen(false);
        if (props.onClose) {
            props.onClose();
        }
    }

    if (!isGuideOpen) {
        if (!showAgain) {
            localStorage.setItem(GUIDE_SHOWN_FLAG, "true");
        }

        return null;
    }

    return (
        <>
            <div className="max-h-[80vh] max-w-[80vw] py-4 px-8 shadow-xl rounded-xl bg-white flex flex-col justify-center transition-all duration-300 ease-in-out">
                <button className="ml-auto text-gray-500 inline-flex" onClick={closeGuide}>
                    <FontAwesomeIcon icon={faX} className="h-5 w-5" />
                </button>
                <div className="p-8 mb-16 mx-auto">
                    {steps[activeStep].title}
                    {steps[activeStep].content}
                </div>

                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => setActiveStep(index)}>
                            <FontAwesomeIcon icon={step.icon} className="h-5 w-5" />
                        </Step>
                    ))}
                </Stepper>
                <div className="mt-16 flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                        Prev
                    </Button>
                    {!props.forceShow && (
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
                    )}
                    <Button onClick={handleTryIt}>
                        {isLastStep ? "Try it!" : "Next"}
                    </Button>
                </div>
            </div>
        </>
    );
}