import Button from './Button';
export default function Hero() {
    return (
        <div className="min-h-screen flex flex-col gap-10 items-center text-center justify-center max-w-[800] w-full mx-auto p-4">
            <div className="flex flex-col gap-4">
                <p className="text-sm md:text-base font-light">
                    It&apos;s time to get
                </p>
                <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
                    Y<span className="text-blue-400">normous</span>
                </h1>
            </div>
            <p className="text-sm md:text-base font-light">
                I hereby acknowledge that I may become
                <span className="text-blue-400 font-medium">
                    unbelievably ynormous
                </span>{' '}
                and accept all the risks of becoming the local{' '}
                <span className="text-blue-400 font-medium">
                    mass monstrosity
                </span>
                , afflicted with severe body dismorphia, unable to fit through
                doors.
            </p>
            <Button
                text="Accept & Begin"
                func={() => (window.location.href = '#generate')}
            />
        </div>
    );
}