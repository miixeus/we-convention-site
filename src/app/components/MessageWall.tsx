import { useEffect, useState } from "react";
import { X, MapPin, Camera, Loader2, Pencil, Trash2 } from "lucide-react";
import { supabase } from "./supabaseClient";

interface WallMessage {
  id: string;
  name: string;
  origin: string;
  contact: string | null;
  message: string;
  photo_url: string | null;
  created_at: string;
}

type Step = "form" | "review";

const emptyFormData = {
  name: "",
  origin: "",
  contact: "",
  message: "",
};

export function MessageWall() {
  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [loadingWall, setLoadingWall] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState(emptyFormData);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Busca as mensagens para exibir no mural
  const fetchMessages = async () => {
    setLoadingWall(true);
    const { data, error } = await supabase
      .from("wall_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data as WallMessage[]);
    }
    setLoadingWall(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("The photo must be a maximum of 5MB.");
      return;
    }

    setSubmitError(null);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
  };

  const resetForm = () => {
    setFormData(emptyFormData);
    removePhoto();
    setSubmitError(null);
  };

  // Avança da etapa de preenchimento para a etapa de revisão (preview)
  const handleGoToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setStep("review");
  };

  // Volta da revisão para o formulário, mantendo os dados preenchidos, para edição
  const handleEdit = () => {
    setStep("form");
  };

  // Apaga tudo e volta ao formulário em branco
  const handleDiscard = () => {
    resetForm();
    setStep("form");
  };

  // Confirma na etapa de revisão e efetivamente envia para o Supabase
  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);

    try {
      let photoUrl: string | null = null;

      // 1) Se houver foto, faz upload para o Supabase Storage primeiro
      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("wall-photos")
          .upload(fileName, photoFile);

        if (uploadError) {
          throw new Error("Unable to send the photo. Please try again.");
        }

        const { data: publicUrlData } = supabase.storage
          .from("wall-photos")
          .getPublicUrl(fileName);

        photoUrl = publicUrlData.publicUrl;
      }

      // 2) Insere a mensagem (aparece direto no mural, sem moderação)
      const { data: inserted, error: insertError } = await supabase
        .from("wall_messages")
        .insert({
          name: formData.name.trim(),
          origin: formData.origin.trim(),
          contact: formData.contact.trim() || null,
          message: formData.message.trim(),
          photo_url: photoUrl,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error("Your message could not be sent. Please try again.");
      }

      // Adiciona a nova mensagem no topo do mural imediatamente, sem precisar recarregar
      if (inserted) {
        setMessages((prev) => [inserted as WallMessage, ...prev]);
      }

      setSubmitted(true);
      resetForm();
    } catch (err: any) {
      setSubmitError(
        err.message ||
          "Something went wrong. Please try again in a few moments.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setSubmitted(false);
    setStep("form");
    resetForm();
  };

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#E8E2D6" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-[#1F2A28]"></div>
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C6A15B" }}
            >
              Chapter Two
            </p>
            <div className="w-16 h-px bg-[#1F2A28]"></div>
          </div>
          <h2
            className="text-5xl md:text-6xl tracking-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1F2A28",
            }}
          >
            Friends Around the World
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: "#2F2F2F" }}
          >
            Leave us a message, tell us where you're from, and become part of
            our wall of affection.
          </p>
        </div>

        {/* Botão para abrir o formulário */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3.5 bg-[#1F2A28] text-[#F8F6F2] hover:bg-[#2F2F2F] transition-colors tracking-wide"
          >
            Leave my message
          </button>
        </div>

        {/* Grid do mural */}
        {loadingWall ? (
          <div className="flex justify-center py-20">
            <Loader2
              className="animate-spin"
              size={28}
              style={{ color: "#C6A15B" }}
            />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base italic" style={{ color: "#2F2F2F" }}>
              Be the first to leave us a message ✦
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#F8F6F2] border border-[#1F2A28]/10 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                {msg.photo_url && (
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={msg.photo_url}
                      alt={msg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <p
                    className="text-base italic flex-1 mb-4"
                    style={{ color: "#2F2F2F" }}
                  >
                    "{msg.message}"
                  </p>

                  <div className="border-t border-[#1F2A28]/10 pt-4">
                    <h4
                      className="text-lg mb-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1F2A28",
                      }}
                    >
                      {msg.name}
                    </h4>
                    <p
                      className="text-xs flex items-center gap-1.5 uppercase tracking-wide"
                      style={{ color: "#C6A15B" }}
                    >
                      <MapPin size={12} />
                      {msg.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contador */}
        {!loadingWall && messages.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm" style={{ color: "#2F2F2F" }}>
              {messages.length}{" "}
              {messages.length === 1 ? "brother left" : "brothers left"} your
              message to us.
            </p>
          </div>
        )}
      </div>

      {/* Modal do formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#F8F6F2] max-w-md w-full p-8 relative border border-[#1F2A28]/20 shadow-2xl my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#2F2F2F] hover:text-[#1F2A28]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              // Estado de sucesso (depois de confirmar na revisão)
              <div className="text-center py-8">
                <h3
                  className="text-3xl mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#1F2A28",
                  }}
                >
                  Thank you! ✦
                </h3>
                <p className="text-base mb-8" style={{ color: "#2F2F2F" }}>
                  Your message is already on our wall.
                </p>
                <button
                  onClick={closeModal}
                  className="px-8 py-3 bg-[#1F2A28] text-[#F8F6F2] hover:bg-[#2F2F2F] transition-colors"
                >
                  To close
                </button>
              </div>
            ) : step === "form" ? (
              <>
                <h3
                  className="text-3xl mb-6 text-center"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#1F2A28",
                  }}
                >
                  Leave your message
                </h3>

                <form onSubmit={handleGoToReview} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#2F2F2F" }}
                    >
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white border border-[#1F2A28]/20 focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#2F2F2F" }}
                    >
                      Where are you from *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      placeholder="Ex: São Paulo, Brasil"
                      value={formData.origin}
                      onChange={(e) =>
                        setFormData({ ...formData, origin: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white border border-[#1F2A28]/20 focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#2F2F2F" }}
                    >
                      Contact (optional)
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="WhatsApp, Instagram ou e-mail"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white border border-[#1F2A28]/20 focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#2F2F2F" }}
                    >
                      Your Message *
                    </label>
                    <textarea
                      required
                      maxLength={500}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white border border-[#1F2A28]/20 focus:outline-none focus:border-[#C6A15B] h-24 resize-none"
                      placeholder="Share a few words..."
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#2F2F2F" }}
                    >
                      Photo (optional)
                    </label>

                    {photoPreview ? (
                      <div className="relative w-24 h-24">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-24 h-24 object-cover border border-[#1F2A28]/20"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-[#1F2A28] text-white rounded-full p-1"
                          aria-label="Remove Photo"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-2 px-4 py-2 bg-white border border-dashed border-[#1F2A28]/30 cursor-pointer hover:border-[#C6A15B] transition-colors w-fit">
                        <Camera size={16} style={{ color: "#C6A15B" }} />
                        <span className="text-sm" style={{ color: "#2F2F2F" }}>
                          Choose photo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-sm" style={{ color: "#d4183d" }}>
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1F2A28] text-[#F8F6F2] hover:bg-[#2F2F2F] transition-colors"
                  >
                    Review message
                  </button>
                </form>
              </>
            ) : (
              // Etapa de revisão: preview de como vai aparecer no mural + editar/apagar
              <>
                <h3
                  className="text-3xl mb-2 text-center"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#1F2A28",
                  }}
                >
                  Check before sending
                </h3>
                <p
                  className="text-sm text-center mb-6"
                  style={{ color: "#2F2F2F", opacity: 0.8 }}
                >
                  This is how your message will appear on the wall.
                </p>

                {/* Preview no mesmo estilo do card do mural */}
                <div className="bg-white border border-[#1F2A28]/10 shadow-md flex flex-col overflow-hidden mb-6">
                  {photoPreview && (
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={photoPreview}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p
                      className="text-base italic mb-4"
                      style={{ color: "#2F2F2F" }}
                    >
                      "{formData.message}"
                    </p>
                    <div className="border-t border-[#1F2A28]/10 pt-4">
                      <h4
                        className="text-lg mb-1"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: "#1F2A28",
                        }}
                      >
                        {formData.name}
                      </h4>
                      <p
                        className="text-xs flex items-center gap-1.5 uppercase tracking-wide"
                        style={{ color: "#C6A15B" }}
                      >
                        <MapPin size={12} />
                        {formData.origin}
                      </p>
                      {formData.contact && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#2F2F2F", opacity: 0.7 }}
                        >
                          Contact: {formData.contact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm mb-4" style={{ color: "#d4183d" }}>
                    {submitError}
                  </p>
                )}

                {/* Ações: editar, apagar, confirmar */}
                <div className="flex gap-3 mb-3">
                  <button
                    type="button"
                    onClick={handleEdit}
                    disabled={submitting}
                    className="flex-1 py-2.5 border border-[#1F2A28]/30 text-[#1F2A28] hover:bg-[#1F2A28]/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    disabled={submitting}
                    className="flex-1 py-2.5 border border-[#d4183d]/40 text-[#d4183d] hover:bg-[#d4183d]/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={submitting}
                  className="w-full py-3 bg-[#1F2A28] text-[#F8F6F2] hover:bg-[#2F2F2F] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Send...
                    </>
                  ) : (
                    "Confirm and publish"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
