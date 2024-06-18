import { useState } from 'react';
import PropTypes from 'prop-types';
import { WORKOUTS, SCHEMES } from '../utils/exercises';
import SectionWrapper from './SectionWrapper';
import Button from './Button';

function Header(props) {
    const { index, title, description } = props;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
                <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
                    {index}
                </p>
                <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
            </div>
            <p className="text-sm sm:text-base mx-auto">{description}</p>
        </div>
    );
}

Header.propTypes = {
    index: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default function Generator(props) {
    const {
        poison,
        setPoison,
        muscles,
        setMuscles,
        goal,
        setGoal,
        updateWorkout,
    } = props;
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter((val) => val !== muscleGroup));
            return;
        }

        if (muscles.length > 2) {
            return;
        }
        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            setShowModal(false);
            return;
        }

        setMuscles([...muscles, muscleGroup]);
        if (muscles.length === 2) setShowModal(false);
    }
    return (
        <SectionWrapper
            id="generate"
            header={'generate your workout'}
            title={["It's", 'Huge', "o'clock"]}>
            <Header
                index="01"
                title="Pick your poison"
                description="Select the workout you wish to endure."
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(WORKOUTS).map((type, typeIndex) => {
                    return (
                        <button
                            onClick={() => {
                                setMuscles([]);
                                setPoison(type);
                            }}
                            className={
                                'bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg capitalize' +
                                (type === poison
                                    ? ' border-blue-600'
                                    : ' border-blue-400')
                            }
                            key={typeIndex}>
                            {type.replaceAll('_', ' ')}
                        </button>
                    );
                })}
            </div>

            <Header
                index="02"
                title="Lock on targets"
                description="Select the muscles judged for annahilation."
            />
            <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
                <button
                    onClick={toggleModal}
                    className="relative flex items-center justify-center p-3 ">
                    <p className="capitalize">
                        {muscles.length == 0
                            ? 'Select muscles groups'
                            : muscles.join(' / ')}
                    </p>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
                </button>
                {showModal && (
                    <div className="flex flex-col">
                        {(poison === 'individual'
                            ? WORKOUTS[poison]
                            : Object.keys(WORKOUTS[poison])
                        ).map((muscleGroup, muscleGroupIndex) => {
                            return (
                                <button
                                    key={muscleGroupIndex}
                                    onClick={() => {
                                        updateMuscles(muscleGroup);
                                    }}
                                    className={
                                        'capitalize hover:text-blue-400 duration-200 ' +
                                        (muscles.includes(muscleGroup)
                                            ? ' text-blue-400'
                                            : '')
                                    }>
                                    {muscleGroup.replaceAll('_', ' ')}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <Header
                index="03"
                title="Become Juggernaut"
                description="Select your ultimate objective."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                    return (
                        <button
                            onClick={() => {
                                setGoal(scheme);
                            }}
                            className={
                                'bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg capitalize' +
                                (scheme === goal
                                    ? ' border-blue-600'
                                    : ' border-blue-400')
                            }
                            key={schemeIndex}>
                            {scheme.replaceAll('_', ' ')}
                        </button>
                    );
                })}
            </div>
            <Button
                text="Formulate"
                func={updateWorkout}
            />
        </SectionWrapper>
    );
}

Generator.propTypes = {
    poison: PropTypes.string.isRequired,
    setPoison: PropTypes.func.isRequired,
    muscles: PropTypes.array.isRequired,
    setMuscles: PropTypes.func.isRequired,
    goal: PropTypes.string.isRequired,
    setGoal: PropTypes.func.isRequired,
};
