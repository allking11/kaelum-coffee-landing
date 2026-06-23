import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Phone, User, Clock, Briefcase, Trash2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import joinTeamImg from "@/assets/join-team.webp";

export function Careers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("barista");
  const [availability, setAvailability] = useState("flexible");
  const [file, setFile] = useState<File | null>(null);
  
  // Form submission and animation states
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Over
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Handle File Input Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Validate File
  const validateAndSetFile = (selectedFile: File) => {
    setErrorMessage("");
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    
    // Check extension if MIME type is empty
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const isDoc = fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx";

    if (!allowedTypes.includes(selectedFile.type) && !isDoc) {
      setErrorMessage("Solo se permiten archivos PDF o Word (.doc, .docx).");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage("El archivo supera el límite de 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setErrorMessage("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Por favor, ingresa un número de teléfono válido (10 dígitos).");
      return;
    }

    if (!file) {
      setErrorMessage("Por favor, carga tu currículum o hoja de vida.");
      return;
    }

    setErrorMessage("");
    setStatus("uploading");
    setUploadProgress(0);

    // Simulate File Upload Progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setStatus("sending");
          
          // Simulate email sending delay
          setTimeout(() => {
            setStatus("success");
          }, 1500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setRole("barista");
    setAvailability("flexible");
    setFile(null);
    setUploadProgress(0);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="unete" className="py-12 sm:py-16 md:py-28 bg-navy text-cream relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-mosaic-dark/10 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Aspirational Brand Copy & Lifestyle image */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          <Reveal>
            <p className="font-script text-mosaic-dark text-2xl mb-2">talento local</p>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-cream leading-tight">
              ¿Listo para preparar historias con nosotros?
            </h2>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-cream/80 text-base sm:text-lg leading-relaxed">
              Buscamos personas apasionadas por el café de especialidad, el matcha auténtico y el buen servicio. Si eres estudiante, tienes un horario dinámico y quieres aprender en un gran ambiente de trabajo en Distrito Tec, ¡nos encantaría conocerte!
            </p>
          </Reveal>

          {/* AI Generated image of community student */}
          <Reveal delay={0.2} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-navy/20">
            <img
              src={joinTeamImg}
              alt="Estudiante en KAELUM Coffee Bar"
              width={500}
              height={375}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>

        {/* Right Column: CV Upload Card / Interactive form */}
        <div className="md:col-span-7">
          <Reveal delay={0.15}>
            <div className="bg-white text-navy rounded-[32px] p-6 sm:p-10 shadow-2xl border border-navy/5 relative overflow-hidden min-h-[460px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left mb-2">
                      <h3 className="font-display text-2xl font-bold text-navy">Envíanos tu CV</h3>
                      <p className="text-navy/60 text-sm mt-1">Completa tus datos y sube tu hoja de vida en segundos.</p>
                    </div>

                    {errorMessage && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4 text-sm animate-shake" role="alert">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="careers-name" className="text-xs font-bold text-navy/70 uppercase tracking-wider block">
                          Nombre completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                          <input
                            type="text"
                            id="careers-name"
                            required
                            placeholder="Ej. Sofía Martínez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-navy/10 bg-cream/30 focus:border-navy focus:bg-white focus:outline-none transition-colors text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label htmlFor="careers-phone" className="text-xs font-bold text-navy/70 uppercase tracking-wider block">
                          Teléfono de contacto
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                          <input
                            type="tel"
                            id="careers-phone"
                            required
                            placeholder="Ej. 81 1234 5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-navy/10 bg-cream/30 focus:border-navy focus:bg-white focus:outline-none transition-colors text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Role selection */}
                      <div className="space-y-1.5">
                        <label htmlFor="careers-role" className="text-xs font-bold text-navy/70 uppercase tracking-wider block">
                          Puesto de interés
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40 pointer-events-none" />
                          <select
                            id="careers-role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-navy/10 bg-cream/30 focus:border-navy focus:bg-white focus:outline-none transition-colors text-sm font-medium appearance-none cursor-pointer"
                          >
                            <option value="barista">Barista (Café y Matcha)</option>
                            <option value="cocina">Cocina & Brunch</option>
                            <option value="reposteria">Repostería & Horneado</option>
                            <option value="servicio">Servicio al cliente</option>
                          </select>
                        </div>
                      </div>

                      {/* Availability selection */}
                      <div className="space-y-1.5">
                        <label htmlFor="careers-availability" className="text-xs font-bold text-navy/70 uppercase tracking-wider block">
                          Disponibilidad horaria
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40 pointer-events-none" />
                          <select
                            id="careers-availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-navy/10 bg-cream/30 focus:border-navy focus:bg-white focus:outline-none transition-colors text-sm font-medium appearance-none cursor-pointer"
                          >
                            <option value="flexible">Flexible / Estudiante</option>
                            <option value="matutino">Turno Matutino (08:30 - 15:00)</option>
                            <option value="vespertino">Turno Vespertino (14:30 - 21:00)</option>
                            <option value="findesemana">Fines de semana</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-navy/70 uppercase tracking-wider block">
                        Cargar currículum / Hoja de vida
                      </span>
                      
                      {!file ? (
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={triggerFileInput}
                          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:bg-cream/20 ${
                            isDragActive 
                              ? "border-navy bg-cream/30 scale-[0.99]" 
                              : "border-navy/15 bg-cream/10"
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            aria-label="Cargar archivo de currículum"
                          />
                          <div className="h-12 w-12 rounded-full bg-navy/5 flex items-center justify-center text-navy/60 group-hover:scale-105 transition-transform">
                            <Upload className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy">
                              Arrastra tu archivo aquí o <span className="text-mosaic-dark hover:underline">búscalo</span>
                            </p>
                            <p className="text-xs text-navy/40 mt-1">PDF o Word (Máx. 5MB)</p>
                          </div>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between p-4 rounded-2xl border border-navy/10 bg-cream/15"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/60 shrink-0">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-navy truncate">{file.name}</p>
                              <p className="text-xs text-navy/40 mt-0.5">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            aria-label="Eliminar archivo cargado"
                            className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-navy/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </motion.div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-navy text-cream font-bold py-4 shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                    >
                      Enviar postulación
                    </button>
                  </motion.form>
                )}

                {/* Uploading progress state */}
                {status === "uploading" && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-6 text-center py-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-cream/30 flex items-center justify-center text-navy relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-navy/10"
                        animate={{ y: ["100%", "0%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <Upload className="h-6 w-6 relative z-10 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2 w-full max-w-xs">
                      <h4 className="font-display text-lg font-bold text-navy">Subiendo currículum...</h4>
                      <p className="text-xs text-navy/40">Preparando tu archivo para envío seguro</p>
                      
                      <div className="w-full bg-navy/5 h-2 rounded-full overflow-hidden mt-4">
                        <motion.div 
                          className="bg-navy h-full rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-bold text-navy/60 block mt-1">{uploadProgress}%</span>
                    </div>
                  </motion.div>
                )}

                {/* Sending mail state */}
                {status === "sending" && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center py-8"
                  >
                    <div className="relative flex items-center justify-center h-16 w-16">
                      <div className="absolute inset-0 border-4 border-navy/10 rounded-full" />
                      <div className="absolute inset-0 border-4 border-t-navy rounded-full animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display text-lg font-bold text-navy">Procesando postulación</h4>
                      <p className="text-xs text-navy/40">Enviando hoja de vida a nuestro equipo de baristas</p>
                    </div>
                  </motion.div>
                )}

                {/* Success animation & message */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center space-y-6 text-center py-8"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-16 w-16 rounded-full bg-[#34A853] flex items-center justify-center text-white shadow-lg shadow-[#34A853]/20"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    
                    <div className="space-y-3 max-w-sm">
                      <h3 className="font-display text-2xl font-black text-navy">¡Postulación Recibida!</h3>
                      <p className="text-navy/70 text-sm leading-relaxed">
                        Muchas gracias, <strong className="text-navy">{name}</strong>. Hemos recibido tus datos y tu CV con éxito. Nuestro equipo te contactará directamente por llamada o WhatsApp muy pronto.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-full border border-navy/15 hover:border-navy hover:bg-cream/10 px-6 py-2.5 text-xs font-semibold text-navy transition-all cursor-pointer"
                    >
                      Enviar otra postulación
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
