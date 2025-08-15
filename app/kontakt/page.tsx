"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Turnstile from "@/components/ui/turnstile";
import { 
  Step1Visual,
  Step2Visual,
  Step3Visual,
  Step4Visual,
  Step5Visual,
} from "@/components/ui/onboarding-visuals";


interface FormData {
  name: string;
  phone: string;
  email: string;
  website: string;
  investment: string;
  goals: string;
  openness: string;
}

type FormErrors = Partial<Record<keyof FormData, string>> & { form?: string };

function KontaktContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shake, setShake] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [calendlyFailed, setCalendlyFailed] = useState(false);
  const [calendlyStartedLoading, setCalendlyStartedLoading] = useState(false);
  const [calendlyPreloaded, setCalendlyPreloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    website: '',
    investment: '',
    goals: '',
    openness: ''
  });

  /*
  const handleVerify = React.useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);
  */

  const totalSteps = 6;

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name) {
        newErrors.name = "Meno je povinné.";
        isValid = false;
      }
      if (!formData.phone) {
        newErrors.phone = "Telefónne číslo je povinné.";
        isValid = false;
      } else if (!/^\+?\d{10,}$/.test(formData.phone)) {
        newErrors.phone = "Zadajte platné telefónne číslo.";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email je povinný.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Zadajte platný email.";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.website) {
        newErrors.website = "URL adresa je povinná.";
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.investment) {
        newErrors.investment = "Vyberte jednu z možností.";
        isValid = false;
      }
    } else if (step === 4) {
      if (!formData.goals) {
        newErrors.goals = "Popíšte vaše ciele.";
        isValid = false;
      }
    } else if (step === 5) {
      if (!formData.openness) {
        newErrors.openness = "Vyberte jednu z možností.";
        isValid = false;
      }
    } else if (step === 6) {
      // Calendly step - no validation needed
      isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Step 6 is the final step - form completed
        // Redirect to success page instead of showing modal
        router.push('/success');
        setFormSubmitted(true);
        setShowOnboarding(false);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleSubmit = React.useCallback(async () => {
    setIsLoading(true);
    setErrors({});
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Vyskytla sa chyba pri odosielaní.');
      }

      console.log('Form submitted successfully:', data);
      setIsLoading(false);
      return data; // Return success data
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Vyskytla sa chyba. Skúste to znova.' 
      }));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setIsLoading(false);
      throw error; // Re-throw to prevent form progression
    }
  }, [formData]);

  const handleCloseModal = React.useCallback(() => {
    setShowOnboarding(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      website: '',
      investment: '',
      goals: '',
      openness: ''
    });
    // Navigate back to /kontakt without modal parameter
    router.replace('/kontakt');
  }, [router]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showOnboarding) {
      handleCloseModal();
    }
    
    if (event.key === 'Enter' && showOnboarding) {
      event.preventDefault();
      if (currentStep < totalSteps) {
        handleNextStep();
        // Focus first input on next step after a small delay
        setTimeout(() => {
          const firstInput = document.querySelector('.modal-step input, .modal-step textarea') as HTMLElement;
          if (firstInput) {
            firstInput.focus();
          }
        }, 200);
      } else {
        handleSubmit();
      }
    }
  };

  // Auto-open modal if modal query parameter is present
  useEffect(() => {
    const modalParam = searchParams.get('modal');
    if (modalParam === 'true') {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [searchParams]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showOnboarding) {
      // Store original overflow style
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = originalStyle;
        document.documentElement.style.overflow = originalStyle;
      };
    }
  }, [showOnboarding]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.event &&
        event.data.event === "calendly.event_scheduled"
      ) {
        setShowOnboarding(false);
        // Redirect to success page instead of showing modal
        router.push('/success');
        setFormSubmitted(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Smart preloading - start loading resources at step 4
  useEffect(() => {
    if (currentStep >= 4 && !calendlyPreloaded) {
      const preloadCalendly = async () => {
        try {
          console.log('🚀 Preloading Calendly resources...');

          // Preload stylesheet with high priority
          const stylesheetPromise = new Promise<void>((resolve, reject) => {
            const existingStylesheet = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
            if (existingStylesheet) {
              resolve();
              return;
            }

            const stylesheet = document.createElement('link');
            stylesheet.rel = 'preload';
            stylesheet.as = 'style';
            stylesheet.href = 'https://assets.calendly.com/assets/external/widget.css';
            stylesheet.crossOrigin = 'anonymous';
            stylesheet.onload = () => {
              // Convert to actual stylesheet
              stylesheet.rel = 'stylesheet';
              resolve();
            };
            stylesheet.onerror = () => reject(new Error('Failed to preload Calendly CSS'));
            document.head.appendChild(stylesheet);
          });

          // Preload script
          const scriptPromise = new Promise<void>((resolve, reject) => {
            const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
            if (existingScript) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => {
              // Wait for Calendly object to be available
              const checkCalendly = () => {
                if (window.Calendly) {
                  console.log('✅ Calendly preloaded successfully');
                  resolve();
                } else {
                  setTimeout(checkCalendly, 50);
                }
              };
              checkCalendly();
            };
            script.onerror = () => reject(new Error('Failed to preload Calendly script'));
            document.head.appendChild(script);
          });

          await Promise.all([stylesheetPromise, scriptPromise]);
          setCalendlyPreloaded(true);

        } catch (error) {
          console.warn('Calendly preloading failed:', error);
          // Don't set failed state yet, we'll try again on step 6
        }
      };

      preloadCalendly();
    }
  }, [currentStep, calendlyPreloaded]);

  // Initialize Calendly widget when reaching step 6 (resources should already be loaded)
  useEffect(() => {
    if (currentStep === 6) {
      let isMounted = true;
      let fallbackTimer: NodeJS.Timeout;
      let initTimer: NodeJS.Timeout;

      const initializeCalendly = async () => {
        try {
          setCalendlyFailed(false);
          setCalendlyStartedLoading(true);

          // If preloaded successfully, initialize immediately
          if (calendlyPreloaded && window.Calendly) {
            console.log('✅ Using preloaded Calendly');
            
            // Wait for DOM to be ready with container
            const waitForContainer = () => {
              const container = document.querySelector('.calendly-inline-widget');
              if (container && isMounted && window.Calendly) {
                try {
                  window.Calendly.initInlineWidget({
                    url: 'https://calendly.com/meet-launch/online-meeting?primary_color=331bd2&hide_gdpr_banner=1',
                    parentElement: container as HTMLElement
                  });
                  setCalendlyLoaded(true);
                } catch (initError) {
                  console.warn('Calendly widget initialization failed:', initError);
                  setCalendlyFailed(true);
                }
              } else if (isMounted) {
                // Try again in next frame
                requestAnimationFrame(waitForContainer);
              }
            };
            
            initTimer = setTimeout(waitForContainer, 50);
            return;
          }

          // Fallback: load resources now if preloading failed
          console.log('⚠️ Preloading failed, loading Calendly now...');
          
          // Load stylesheet
          const stylesheetPromise = new Promise<void>((resolve, reject) => {
            const existingStylesheet = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
            if (existingStylesheet) {
              resolve();
              return;
            }

            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = 'https://assets.calendly.com/assets/external/widget.css';
            stylesheet.onload = () => resolve();
            stylesheet.onerror = () => reject(new Error('Failed to load Calendly CSS'));
            document.head.appendChild(stylesheet);
          });

          // Load script
          const scriptPromise = new Promise<void>((resolve, reject) => {
            const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
            if (existingScript && window.Calendly) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => {
              const checkCalendly = () => {
                if (window.Calendly) {
                  resolve();
                } else {
                  setTimeout(checkCalendly, 50);
                }
              };
              checkCalendly();
            };
            script.onerror = () => reject(new Error('Failed to load Calendly script'));
            document.head.appendChild(script);
          });
          
          await Promise.all([stylesheetPromise, scriptPromise]);
          
          const waitForContainerFallback = () => {
            const container = document.querySelector('.calendly-inline-widget');
            if (container && isMounted && window.Calendly) {
              try {
                window.Calendly.initInlineWidget({
                  url: 'https://calendly.com/meet-launch/online-meeting?primary_color=331bd2&hide_gdpr_banner=1',
                  parentElement: container as HTMLElement
                });
                setCalendlyLoaded(true);
              } catch (initError) {
                console.warn('Calendly widget initialization failed:', initError);
                setCalendlyFailed(true);
              }
            } else if (isMounted) {
              requestAnimationFrame(waitForContainerFallback);
            }
          };
          
          initTimer = setTimeout(waitForContainerFallback, 300);

        } catch (error) {
          console.warn('Calendly initialization failed, using iframe fallback:', error);
          if (isMounted) {
            setCalendlyFailed(true);
          }
        }
      };

      initializeCalendly();

      // Reduced timeout since resources should be preloaded
      fallbackTimer = setTimeout(() => {
        if (isMounted && !calendlyLoaded) {
          console.warn('Calendly timeout, switching to iframe');
          setCalendlyFailed(true);
        }
      }, 5000);

      return () => {
        isMounted = false;
        clearTimeout(fallbackTimer);
        clearTimeout(initTimer);
      };
    }
  }, [currentStep, calendlyLoaded, calendlyPreloaded]);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (mounted) {
        setScrollY(window.scrollY);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, showOnboarding, currentStep, totalSteps, handleSubmit]);

  // Focus first input when modal opens or step changes
  useEffect(() => {
    if (showOnboarding) {
      const timer = setTimeout(() => {
        const firstInput = document.querySelector('.modal-step input, .modal-step textarea') as HTMLElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding, currentStep]);

  const scrollRotation = scrollY * 0.110810;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (errors.form) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.form;
            return newErrors;
        });
    }
  };


  const getStepProgress = () => (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-28 pb-32">
          {/* Black gradient from top covering text and half circle */}
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black via-black/80 via-60% to-transparent z-[15]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 min-h-[18rem]">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl mt-15 lg:text-7xl font-bold mb-10 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
              >
                Zisti, ako môže tvoja firma rásť rýchlejšie
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl text-slate-300 max-w-5xl mx-auto mb-8 leading-relaxed relative z-30"
              >
                Vyplňte dotazník, aby sme lepšie porozumeli vašim cieľom, a následne si zarezervujte nezáväzný hovor, ktorý bude trvať približne 15 minút. Počas neho si prejdeme vašu aktuálnu situáciu, ciele a potenciál.
              </motion.p>

              {/* Beautiful CTA Trigger */}
              {!showOnboarding && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-30"
                >
                  <button
                    onClick={() => !formSubmitted && setShowOnboarding(true)}
                    disabled={formSubmitted}
                    className={`group relative inline-flex items-center justify-center gap-4 px-12 py-6 text-xl font-semibold text-white rounded-3xl shadow-2xl border transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black overflow-hidden ${
                      formSubmitted 
                        ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-green-500/40 border-green-400/30 cursor-default' 
                        : 'cursor-pointer bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 shadow-purple-500/40 border-purple-400/30 hover:shadow-3xl hover:shadow-purple-500/50 hover:border-purple-300/40 focus:ring-purple-500/50 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {/* Animated background gradient */}
                    {!formSubmitted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    
                    {/* Shimmer effect */}
                    {!formSubmitted && (
                      <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/30 to-transparent h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    
                    {/* Pulsing glow */}
                    {!formSubmitted && (
                      <div className="absolute inset-0 rounded-3xl bg-purple-500/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-4">
                      <span>{formSubmitted ? 'Ďakujeme za záujem!' : 'Chcem vedieť viac'}</span>
                      {formSubmitted ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <motion.div
                          animate={{ 
                            x: [0, 4, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </span>
                  </button>
                  
                  {/* Subtitle */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-6 text-sm text-gray-400 relative z-20"
                  >
                    {formSubmitted ? 'Formulár bol úspešne odoslaný' : 'Bez záväzkov • Okamžitá odpoveď'}
                  </motion.p>
                </motion.div>
              )}
          </div>
          
          {/* Circle framing the CTA */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[50%] sm:top-[55%] -translate-y-1/2 w-[55rem] h-[55rem] pointer-events-none z-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: mounted ? 1 : 0,
                scale: 1,
                rotate: initialAnimComplete ? 180 + scrollRotation : 180
              }}
              transition={{ 
                duration: initialAnimComplete ? 0 : 1.2, 
                ease: initialAnimComplete ? "linear" : "easeOut",
                delay: initialAnimComplete ? 0 : 0.8
              }}
              onAnimationComplete={() => setInitialAnimComplete(true)}
              className="w-full h-full relative"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 80px rgba(147, 51, 234, 0.4))',
                willChange: 'transform, opacity'
              }}
            >
              <Image
                src="/circle.png"
                alt="Circle"
                width={880}
                height={880}
                className="w-full h-full object-contain"
                quality={100}
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Multi-Step Onboarding Modal */}
        <AnimatePresence mode="wait">
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08, ease: "easeOut" }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleCloseModal();
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0, y: 5 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0
                }}
                exit={{ 
                  scale: 0.98, 
                  opacity: 0, 
                  y: 5
                }}
                transition={{ 
                  duration: 0.12,
                  ease: "easeOut"
                }}
                className={`w-full ${currentStep === 6 ? 'max-w-5xl' : 'max-w-4xl'} bg-neutral-900/60 backdrop-blur-xl border border-neutral-700/50 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-900/30 relative mx-2 sm:mx-0 overflow-hidden flex flex-col`}
                style={{ 
                  pointerEvents: 'auto',
                  minHeight: currentStep === 6 ? '700px' : '600px',
                  maxHeight: '85vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <div className={`grid ${currentStep === 6 ? 'md:grid-cols-1' : 'md:grid-cols-2'} ${currentStep === 6 ? 'min-h-[650px]' : 'min-h-[600px]'}`}>
                  {/* Left side: Form */}
                  <div className="p-8 flex flex-col">
                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-300">
                          Krok {currentStep} z {totalSteps}
                        </div>
                        <div className="text-sm font-medium text-purple-400">
                          {Math.round(getStepProgress())}%
                        </div>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getStepProgress()}%` }}
                          transition={{ 
                            duration: 0.2, 
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6 modal-step"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Povedzte nám o sebe
                              </h3>
                              <p className="text-md text-gray-400">
                                Základné informácie pre kontakt
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                  Meno *
                                </label>
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  className="w-full px-4 py-3 bg-neutral-800/60 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors duration-300"
                                  placeholder="Vaše meno"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                  Telefónne číslo *
                                </label>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  className="w-full px-4 py-3 bg-neutral-800/60 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors duration-300"
                                  placeholder="+421 XXX XXX XXX"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                  Email *
                                </label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  className="w-full px-4 py-3 bg-neutral-800/60 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors duration-300"
                                  placeholder="vas@email.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Website */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6 modal-step"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Vaša web stránka
                              </h3>
                              <p className="text-md text-gray-400">
                                Kde vás môžeme nájsť online?
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-300 mb-2">
                                URL adresa *
                              </label>
                              <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-800/60 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors duration-300"
                                placeholder="https://vasa-firma.sk"
                              />
                              {errors.website && <p className="text-red-500 text-xs mt-2">{errors.website}</p>}
                              <p className="text-xs text-gray-500 mt-2">
                                Ak nemáte web stránku, napíšte prosím "Nemáme web"
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Investment */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Investície do rastu
                              </h3>
                              <p className="text-md text-gray-400">
                                Koľko momentálne investujete mesačne?
                              </p>
                            </div>

                            <div className="space-y-3">
                              {[
                                { value: "under-500", label: "< 500€" },
                                { value: "500-2000", label: "500 - 2 000€" },
                                { value: "2000-5000", label: "2 000 - 5 000€" },
                                { value: "5000-20000", label: "5 000 - 20 000€" },
                                { value: "over-20000", label: "20 000€ <" }
                              ].map((option) => (
                                <div
                                  key={option.value}
                                  className="group cursor-pointer"
                                  onClick={() => handleInputChange('investment', option.value)}
                                >
                                  <div className={`p-4 border rounded-lg transition-colors duration-200 ${
                                    formData.investment === option.value 
                                      ? 'bg-purple-500/10 border-purple-500' 
                                      : 'bg-neutral-800/30 border-neutral-700 group-hover:border-neutral-600'
                                  }`}>
                                    <div className="flex items-center">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                                        formData.investment === option.value 
                                          ? 'border-purple-500' 
                                          : 'border-neutral-500 group-hover:border-neutral-400'
                                      }`}>
                                        {formData.investment === option.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 rounded-full bg-purple-500"
                                          />
                                        )}
                                      </div>
                                      <span className={`font-medium transition-colors duration-300 ${
                                        formData.investment === option.value 
                                          ? 'text-white' 
                                          : 'text-neutral-300 group-hover:text-white'
                                      }`}>
                                        {option.label}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {errors.investment && <p className="text-red-500 text-xs mt-2">{errors.investment}</p>}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 4: Goals */}
                        {currentStep === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6 modal-step"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Vaše ciele
                              </h3>
                              <p className="text-md text-gray-400">
                                Na akom výsledku vám záleží najviac?
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Popíšte váš hlavný cieľ *
                              </label>
                              <textarea
                                value={formData.goals}
                                onChange={(e) => handleInputChange('goals', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-neutral-800/60 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors duration-300 resize-none"
                                placeholder="Napr.: zvýšenie tržieb, naplnenie kalendára, zvýšené dosahy na sociálnych sieťach..."
                              />
                              {errors.goals && <p className="text-red-500 text-xs mt-2">{errors.goals}</p>}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 5: Openness */}
                        {currentStep === 5 && (
                          <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Ste otvorení zmenám?
                              </h3>
                              <p className="text-md text-gray-400">
                                Ako pristupujete k novým možnostiam?
                              </p>
                            </div>

                            <div className="space-y-3">
                              {[
                                { value: "yes", label: "Áno, som otvorený novým pohľadom a iným možnostiam, ako zlepšiť výsledky" },
                                { value: "no", label: "Nie, aktuálne nechcem nič meniť ani zlepšovať" }
                              ].map((option) => (
                                <div
                                  key={option.value}
                                  className="group cursor-pointer"
                                  onClick={() => handleInputChange('openness', option.value)}
                                >
                                  <div className={`p-4 border rounded-lg transition-colors duration-200 ${
                                    formData.openness === option.value 
                                      ? 'bg-purple-500/10 border-purple-500' 
                                      : 'bg-neutral-800/30 border-neutral-700 group-hover:border-neutral-600'
                                  }`}>
                                    <div className="flex items-start">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-all duration-300 ${
                                        formData.openness === option.value 
                                          ? 'border-purple-500' 
                                          : 'border-neutral-500 group-hover:border-neutral-400'
                                      }`}>
                                        {formData.openness === option.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 rounded-full bg-purple-500"
                                          />
                                        )}
                                      </div>
                                      <span className={`font-medium leading-relaxed transition-colors duration-300 ${
                                        formData.openness === option.value 
                                          ? 'text-white' 
                                          : 'text-neutral-300 group-hover:text-white'
                                      }`}>
                                        {option.label}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {errors.openness && <p className="text-red-500 text-xs mt-2">{errors.openness}</p>}
                            </div>

                            {/*
                            <div className="mt-6 flex justify-center">
                                <Turnstile 
                                    sitekey="0x4AAAAAABp70vA_8ZdwkeK7" 
                                    onVerify={handleVerify} 
                                />
                            </div>
                            */}
                            {errors.form && <p className="text-red-500 text-xs mt-2 text-center">{errors.form}</p>}
                          </motion.div>
                        )}

                        {/* Step 6: Calendly */}
                        {currentStep === 6 && (
                          <motion.div
                            key="step6"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="space-y-6 h-full flex flex-col"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Zarezervujte si čas
                              </h3>
                              <p className="text-md text-gray-400">
                                Vyberte si termín, ktorý vám vyhovuje
                              </p>
                            </div>
                            <div className="flex-grow relative" style={{ overflow: 'unset' }}>
                              {/* Loading state with improved messaging */}
                              {calendlyStartedLoading && !calendlyLoaded && !calendlyFailed && (
                                <div className="flex flex-col items-center justify-center h-96">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                                  <p className="text-gray-400 text-center">
                                    Načítavam rezervačný systém...
                                    <br />
                                    <span className="text-sm text-gray-500 mt-2 block">Prosím počkajte, pripravujeme kalendár</span>
                                  </p>
                                </div>
                              )}

                              {/* Initial loading state */}
                              {!calendlyStartedLoading && !calendlyFailed && (
                                <div className="flex flex-col items-center justify-center h-96">
                                  <div className="animate-pulse">
                                    <div className="h-12 w-12 bg-purple-500/20 rounded-full mb-4"></div>
                                  </div>
                                  <p className="text-gray-400 text-center">
                                    Inicializujem rezervačný systém...
                                  </p>
                                </div>
                              )}
                              
                              {/* Calendly widget container */}
                              {!calendlyFailed && (
                                <div 
                                  className={`calendly-inline-widget ${!calendlyLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'} transition-opacity duration-700`}
                                  style={{
                                    minWidth: "320px", 
                                    height: "600px",
                                    maxHeight: "600px",
                                    overflow: "hidden"
                                  }}
                                ></div>
                              )}

                              {/* Iframe fallback with better error handling */}
                              {calendlyFailed && (
                                <div className="w-full space-y-4">
                                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                                    <p className="text-yellow-400 text-sm text-center">
                                      💡 Používam záložné riešenie pre lepšiu kompatibilitu
                                    </p>
                                  </div>
                                  <iframe
                                    src="https://calendly.com/meet-launch/online-meeting?primary_color=331bd2&hide_gdpr_banner=1&embed_domain=hubhigh.com&embed_type=Inline"
                                    width="100%"
                                    height="600px"
                                    frameBorder="0"
                                    title="Rezervácia termínu"
                                    className="rounded-lg border-0"
                                    allow="microphone; camera"
                                    onLoad={() => {
                                      // Hide the loading state once iframe loads
                                      setCalendlyLoaded(true);
                                    }}
                                    onError={() => {
                                      console.error('Iframe fallback also failed');
                                    }}
                                  ></iframe>
                                  {/* Enhanced fallback link */}
                                  <div className="text-center mt-4 space-y-2">
                                    <p className="text-gray-400 text-sm">Problémy s načítaním?</p>
                                    <a 
                                      href="https://calendly.com/meet-launch/online-meeting" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 underline text-sm font-medium transition-colors"
                                    >
                                      <span>Otvoriť v novom okne</span>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentStep > 1) {
                            setCurrentStep(currentStep - 1);
                          }
                        }}
                        disabled={currentStep === 1}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                          currentStep === 1 
                            ? 'text-neutral-600 cursor-not-allowed' 
                            : 'text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-800/50'
                        }`}
                      >
                        Späť
                      </button>

                      {currentStep < 5 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 text-sm sm:text-base ${shake ? 'animate-shake' : ''}`}
                        >
                          Ďalej
                        </button>
                      ) : currentStep === 5 ? (
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={async () => {
                            if (isLoading) return;
                            try {
                              await handleSubmit();
                              handleNextStep();
                            } catch (error) {
                              // Error is already handled in handleSubmit
                            }
                          }}
                          className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 text-sm sm:text-base ${shake ? 'animate-shake' : ''} ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Odosielam...
                            </>
                          ) : (
                            'Poslať'
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 text-sm sm:text-base ${shake ? 'animate-shake' : ''}`}
                        >
                          Dokončiť
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Right side: Image Gallery */}
                  {currentStep !== 6 && (
                  <div className="hidden md:block relative p-2">
                    <AnimatePresence>
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-2"
                      >
                        {currentStep === 1 && <Step1Visual />}
                        {currentStep === 2 && <Step2Visual />}
                        {currentStep === 3 && <Step3Visual />}
                        {currentStep === 4 && <Step4Visual />}
                        {currentStep === 5 && <Step5Visual />}
                        {currentStep === 6 && <Step5Visual />}
                      </motion.div>
                    </AnimatePresence>
                     {/* Close button */}
                     <button
                        onClick={handleCloseModal}
                        className="absolute top-6 right-6 w-8 h-8 bg-black/40 backdrop-blur-sm hover:bg-red-500/50 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer group z-10"
                      >
                        <svg className="w-4 h-4 text-white group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                  </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <BackgroundBeams className="z-0" />
    </div>
  );
}

export default function Kontakt() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Načítavam...</p>
        </div>
      </div>
    }>
      <KontaktContent />
    </Suspense>
  );
}