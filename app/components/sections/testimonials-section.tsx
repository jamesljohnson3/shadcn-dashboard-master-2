import Balancer from "react-wrap-balancer"

 
export function TestimonialsSection(): JSX.Element {
  return (
    <section
      id="testimonials-section"
      aria-label="testimonials section"
      className=" "
    >
      <div className=" ">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Join a Growing <br /> Team of{" "}
              
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>See what our customers are saying about us.</Balancer>
          </h3>
        </div>

       
      </div>
    </section>
  )
}
