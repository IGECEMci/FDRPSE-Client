import { ReactNode } from 'react';
import { Card, CardBody, Progress } from '@nextui-org/react';
import { useSteps } from '../../../app/hooks/useSteps';

import { StepComponent } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
interface RenderButtonsProps {
    step: number;
    nextStep: () => void;
    backStep: () => void;
}

interface Props {
    steps: Array<StepComponent>;
    renderButtons: ({ nextStep, backStep, step }: RenderButtonsProps) => ReactNode | Array<ReactNode>;
}

export const Steper = ({ steps, renderButtons }: Props) => {

    const { step, nextStep, backStep, Component, componentName, currentRef } = useSteps({ stepsComponent: steps });

    return (
        <Card className="p-5">
            <div className="w-full flex py-6">
                {
                    steps.map(({ name, icon }, index) => (
                        <div key={name} style={{ width: `${getProgessByStep(steps.length, 0)}%` }} className="flex flex-col items-center">
                            <span className={`transition-all ease-in-out duration-500 rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${(index) <= step ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
                                {icon ? icon({ width: 20, height: 20 }) : <p>{index + 1}</p>}
                            </span>
                            <p className="text-gray-500 font-semibold text-[11px] md:text-sm text-center">{name}</p>
                        </div>
                    ))
                }
            </div>
            <Progress value={getProgessByStep(steps.length, step)} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
            <CardBody>
                <Component ref={currentRef} />
                <div className="py-10">
                    {renderButtons({ nextStep, backStep, step })}
                </div>
            </CardBody>
        </Card>
    )
}