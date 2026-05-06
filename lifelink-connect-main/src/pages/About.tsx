import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  Target,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-soft to-background py-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Connecting Hearts,{' '}
              <span className="text-primary">Saving Lives</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              LifeLink was born from a simple belief: no one should lose a loved one 
              because blood wasn't available in time. We're building a community where 
              help is always just a few clicks away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth?mode=signup&role=donor">
                <Button variant="hero" size="lg">
                  Join Our Mission
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/blood-info">
                <Button variant="outline" size="lg">
                  Learn About Blood Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Timely Blood Access Matters
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Every two seconds, someone in the world needs blood. Whether it's 
                  an accident victim, a cancer patient undergoing treatment, or a 
                  mother during childbirth – blood can mean the difference between 
                  life and death.
                </p>
                <p>
                  Yet, finding blood in emergencies remains a challenge. Families 
                  scramble to find donors, hospitals face shortages, and precious 
                  time is lost in the process.
                </p>
                <p>
                  <strong className="text-foreground">LifeLink changes this.</strong> We've created 
                  a platform that connects those who need blood with verified donors 
                  instantly, making sure help is never more than a few taps away.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '1 in 3', label: 'People will need blood at some point' },
                { number: '90 sec', label: 'Someone needs blood every 90 seconds' },
                { number: '38%', label: 'Of population is eligible to donate' },
                { number: '<10%', label: 'Actually donate each year' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 text-center shadow-soft"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything we build is guided by these principles
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Speed in Emergencies',
                description: 'Every second counts. We\'ve optimized every step to minimize time from request to connection.',
              },
              {
                icon: Shield,
                title: 'Privacy by Design',
                description: 'Contact details are masked until both parties consent. Your data is never shared without permission.',
              },
              {
                icon: Users,
                title: 'Community First',
                description: 'We believe in the power of community. Every donor is a hero, every receiver is family.',
              },
              {
                icon: Target,
                title: 'Accuracy Matters',
                description: 'From blood type matching to location services, we ensure precision in every connection.',
              },
              {
                icon: Lightbulb,
                title: 'Simplicity Wins',
                description: 'Technology should disappear. Anyone, regardless of tech skills, should be able to use LifeLink.',
              },
              {
                icon: Heart,
                title: 'Humanity Above All',
                description: 'Behind every request is a person. We design with empathy, compassion, and understanding.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-border shadow-soft hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How LifeLink Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and designed for real-world emergencies
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Request or Register',
                  description: 'Receivers submit blood requests with urgency levels. Donors register their availability and blood type.',
                },
                {
                  step: 2,
                  title: 'Intelligent Matching',
                  description: 'Our system matches requests with eligible donors based on blood type, location, and availability.',
                },
                {
                  step: 3,
                  title: 'Secure Connection',
                  description: 'Matched donors receive notifications. Contact details are shared only after both parties confirm.',
                },
                {
                  step: 4,
                  title: 'Save Lives',
                  description: 'Donor and receiver connect, donation happens, and a life is saved. Simple as that.',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    {index < 3 && (
                      <div className="w-0.5 h-16 bg-border mx-auto mt-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container-tight text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" fill="currentColor" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of Something Bigger
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-10">
            Whether you're a potential donor or someone who might need blood someday, 
            LifeLink is here for you. Join our growing community of lifesavers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?mode=signup&role=donor">
              <Button variant="secondary" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Become a Donor
              </Button>
            </Link>
            <Link to="/find-blood">
              <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Find Blood Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
