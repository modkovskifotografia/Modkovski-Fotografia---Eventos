'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { brandConfig } from '@/lib/config';
import { Instagram, Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw } from 'lucide-react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

interface SlotItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  fallbackSrc: string;
  poster?: string;
  signedUrl?: string;
  isSupabase?: boolean;
  fileName?: string;
}

const initialSlots: SlotItem[] = [
  {
    id: 7,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/07.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-the-forest-40871-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v7/1080/1920',
    fileName: '07.mp4'
  },
  {
    id: 8,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/08.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-standing-together-40872-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v8/1080/1920',
    fileName: '08.mp4'
  },
  {
    id: 9,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/09.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-bride-adjusting-her-wedding-dress-40874-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v9/1080/1920',
    fileName: '09.mp4'
  },
  {
    id: 10,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/10.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-putting-on-the-wedding-ring-40019-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v10/1080/1920',
    fileName: '10.mp4'
  },
  {
    id: 11,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/11.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-42289-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v11/1080/1920',
    fileName: '11.mp4'
  },
  {
    id: 12,
    type: 'video',
    src: 'https://leemiyktgclhnrtxtjex.supabase.co/storage/v1/object/public/portfolio/12.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-groom-kissing-the-bride-on-the-forehead-42291-large.mp4',
    poster: 'https://picsum.photos/seed/wedding-v12/1080/1920',
    fileName: '12.mp4'
  }
];

function formatTime(seconds: number) {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function ReelVideoCard({ slot, index }: { slot: SlotItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const hideMobileControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [videoError, setVideoError] = useState<string | null>(null);
  const [prevSlotSrc, setPrevSlotSrc] = useState(slot.src);
  const [currentSrc, setCurrentSrc] = useState(slot.src);
  const [triedSignedUrl, setTriedSignedUrl] = useState(false);

  if (slot.src !== prevSlotSrc) {
    setPrevSlotSrc(slot.src);
    setCurrentSrc(slot.src);
    setVideoError(null);
    setTriedSignedUrl(false);
  }

  // Tenta iniciar a reprodução contínua automaticamente
  useEffect(() => {
    console.log(`🎥 [Video Slot ${slot.id}] URL atual configurada:`, currentSrc);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay pode aguardar interação
        });
    }
  }, [currentSrc, slot.id]);

  useEffect(() => {
    return () => {
      if (hideMobileControlsTimerRef.current) {
        clearTimeout(hideMobileControlsTimerRef.current);
      }
    };
  }, []);

  const triggerMobileControls = () => {
    setShowMobileControls(true);
    if (hideMobileControlsTimerRef.current) {
      clearTimeout(hideMobileControlsTimerRef.current);
    }
    hideMobileControlsTimerRef.current = setTimeout(() => {
      setShowMobileControls(false);
    }, 4500);
  };

  const togglePlay = () => {
    triggerMobileControls();
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn(`[Video Slot ${slot.id}] Erro ao dar play:`, err?.message || String(err));
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerMobileControls();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekToPosition = (clientX: number) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newRatio = clickX / rect.width;
    const newTime = newRatio * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    triggerMobileControls();
    setIsScrubbing(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    seekToPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      e.stopPropagation();
      seekToPosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      e.stopPropagation();
      setIsScrubbing(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const skipTime = (seconds: number, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerMobileControls();
    if (videoRef.current && duration) {
      const targetTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVideoError = () => {
    console.warn(`❌ [Video Slot ${slot.id}] Falha ao carregar mídia a partir de:`, currentSrc);

    // Se temos uma Signed URL e ainda não testamos, tenta alternar automaticamente
    if (slot.signedUrl && currentSrc !== slot.signedUrl && !triedSignedUrl) {
      console.log(`🔄 [Video Slot ${slot.id}] Tentando reproduzir via Signed URL de segurança...`);
      setTriedSignedUrl(true);
      setCurrentSrc(slot.signedUrl);
      return;
    }

    const isSupabaseUrl = currentSrc.includes('supabase.co');
    const isMov = currentSrc.toLowerCase().includes('.mov');

    if (isSupabaseUrl) {
      setVideoError(
        'access_denied'
      );
    } else if (isMov) {
      setVideoError('mov_codec');
    } else {
      setVideoError('generic');
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-lg bg-brand-beige-dark group cursor-pointer select-none"
      onClick={togglePlay}
      onMouseEnter={() => setShowMobileControls(true)}
      onMouseLeave={() => setShowMobileControls(false)}
      onTouchStart={triggerMobileControls}
    >
      <video
        key={currentSrc}
        ref={videoRef}
        src={currentSrc}
        poster={slot.poster}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onLoadedData={() => {
          console.log(`✅ [Video Slot ${slot.id}] Vídeo carregado com sucesso:`, currentSrc);
          setVideoError(null);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onError={handleVideoError}
      >
        <source src={currentSrc} type={currentSrc.toLowerCase().includes('.mov') ? 'video/quicktime' : 'video/mp4'} />
        <source src={currentSrc} />
      </video>

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

      {/* Se houver erro de permissão do Supabase ou formato */}
      {videoError ? (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-between p-5 bg-black/85 text-center z-20 text-white backdrop-blur-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-end">
            <span className="text-[9px] bg-brand-wine/90 text-white uppercase tracking-widest px-2 py-0.5 rounded-xs font-semibold">
              Item {slot.id} {slot.fileName ? `· ${slot.fileName}` : ''}
            </span>
          </div>

          <div className="flex flex-col items-center my-auto">
            <div className="w-10 h-10 rounded-full bg-brand-wine/80 flex items-center justify-center mb-3 text-white">
              <Play className="w-4 h-4 opacity-70" />
            </div>

            {videoError === 'access_denied' ? (
              <div className="space-y-2 text-left bg-white/10 p-3 rounded-lg border border-white/15 text-[11px] leading-relaxed">
                <p className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs">
                  <span>⚠️</span> Erro: Access Denied no Supabase
                </p>
                <p className="text-white/90 text-[10.5px]">
                  O arquivo <strong>{slot.fileName || `${slot.id}.mp4`}</strong> está em um bucket <em>Privado</em> no Supabase Storage.
                </p>
                <div className="bg-black/40 p-2 rounded text-[10px] text-white/80 space-y-1">
                  <p className="font-medium text-white">Como liberar no Supabase:</p>
                  <p>1. Acesse <strong>Storage</strong> no Supabase</p>
                  <p>2. Clique no bucket <strong>portfolio</strong></p>
                  <p>3. Ative a opção <strong>&quot;Public bucket&quot;</strong></p>
                </div>
              </div>
            ) : videoError === 'mov_codec' ? (
              <p className="text-xs font-medium leading-relaxed max-w-xs text-white/90">
                Vídeos .mov do iPhone precisam ser convertidos para .mp4 (H.264) para rodar nos navegadores.
              </p>
            ) : (
              <p className="text-xs font-medium leading-relaxed max-w-xs text-white/90">
                Não foi possível carregar o vídeo. Verifique se o link ou arquivo está acessível.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setCurrentSrc(slot.fallbackSrc);
                setVideoError(null);
              }}
              className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-medium py-1.5 px-3 rounded-full transition-colors"
            >
              Usar vídeo demonstrativo
            </button>
            <a
              href={currentSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-amber-200 hover:underline tracking-wider"
            >
              Abrir link original do Supabase ↗
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Indicador se o usuário pausar manualmente */}
          {!isPlaying && !showMobileControls && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all duration-300 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-brand-wine/90 text-white flex items-center justify-center shadow-xl border border-white/30 transform transition-transform duration-300">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
              <span className="text-[10px] text-white tracking-widest uppercase font-semibold mt-3 bg-brand-wine/90 px-3 py-1 rounded-full shadow-md">
                Pausado
              </span>
            </div>
          )}

          {/* Botão de Som rápido no topo direito */}
          <button
            onClick={toggleMute}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-transform hover:scale-110 active:scale-95 z-10"
            title={isMuted ? 'Ativar Som' : 'Desativar Som'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* BARRA DE CONTROLE E MINUTAGEM DO VÍDEO (Hover no Desktop / Clique no Mobile) */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 pt-10 pb-3.5 px-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-300 ${
              showMobileControls ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra de Progresso Interativa (Scrubber / Timeline) */}
            <div
              ref={progressBarRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full py-2 cursor-pointer group/bar touch-none"
              title="Arraste ou clique para avançar ou voltar o vídeo"
            >
              <div className="relative w-full h-1.5 group-hover/bar:h-2.5 bg-white/30 backdrop-blur-xs rounded-full overflow-hidden transition-all duration-200">
                {/* Preenchimento do progresso */}
                <div
                  className="h-full bg-brand-terracotta transition-[width] duration-75 ease-linear rounded-full relative"
                  style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                />
              </div>
              {/* Marcador / Ponto indicador de posição */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg border border-brand-wine/50 pointer-events-none transition-transform duration-150 group-hover/bar:scale-110"
                style={{
                  left: `calc(${Math.min(98, Math.max(2, progressPercent))}% - 7px)`,
                  top: '16px',
                }}
              />
            </div>

            {/* Controles de Reprodução e Minutagem */}
            <div className="flex items-center justify-between mt-1 text-white">
              {/* Botões de Ação: Play/Pause, Voltar 5s, Avançar 5s */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 text-white transition-colors"
                  title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={(e) => skipTime(-5, e)}
                  className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 text-white/90 hover:text-white transition-colors flex items-center justify-center text-[10px]"
                  title="Voltar 5 segundos"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold ml-0.5">-5s</span>
                </button>

                <button
                  onClick={(e) => skipTime(5, e)}
                  className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 text-white/90 hover:text-white transition-colors flex items-center justify-center text-[10px]"
                  title="Avançar 5 segundos"
                >
                  <span className="text-[9px] font-mono font-bold mr-0.5">+5s</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Minutagem (Tempo Atual / Duração Total) */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-tight text-white/90 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                <span className="text-brand-terracotta-light font-bold">
                  {formatTime(currentTime)}
                </span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Borda decorativa refinada */}
      <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
    </motion.div>
  );
}

export default function Portfolio() {
  const [slots, setSlots] = useState<SlotItem[]>(initialSlots);

  useEffect(() => {
    async function checkSupabaseAndLoadFiles() {
      if (!isSupabaseConfigured()) {
        return;
      }

      try {
        const supabase = getSupabase();
        if (!supabase) return;

        console.group('🔌 [Supabase Storage Media Loader]');
        console.log('✅ Cliente Supabase inicializado com sucesso');

        // Lista de buckets potenciais onde o usuário pode ter enviado as mídias
        const targetBuckets = ['portfolio', 'videos', 'midias', 'media', 'public', 'casamento'];
        let matchedBucket: string | null = null;
        let filesList: { name: string; id?: string | null }[] = [];

        for (const bName of targetBuckets) {
          try {
            const { data, error } = await supabase.storage.from(bName).list('', {
              sortBy: { column: 'name', order: 'asc' }
            });

            if (!error && data && data.length > 0) {
              matchedBucket = bName;
              filesList = data;
              console.log(`📁 Encontrados ${data.length} arquivos no bucket '${bName}':`, data.map(f => f.name));
              break;
            }
          } catch {
            // Continua para o próximo bucket
          }
        }

        if (!matchedBucket || filesList.length === 0) {
          console.info('ℹ️ Nenhum arquivo encontrado nos buckets testados. Tentando bucket padrão "portfolio"...');
          matchedBucket = 'portfolio';
        }

        // Mapeia os arquivos encontrados aos 6 slots
        const updatedSlotsPromises = initialSlots.map(async (slot) => {
          const slotIdStr = String(slot.id);
          const slotIdPadded = String(slot.id).padStart(2, '0'); // '03', '01', etc.

          // Procura arquivo correspondente (ex: 3.mp4, 03.mp4, video3.mp4, video_3.mp4, reel3.mp4, etc)
          const matchedFile = filesList.find((f) => {
            if (!f || !f.name) return false;
            const nameLower = f.name.toLowerCase();
            const parts = nameLower.split('.');
            const nameWithoutExt = parts.slice(0, -1).join('.');

            const validExactNames = [
              slotIdStr,
              slotIdPadded,
              `video${slotIdStr}`,
              `video${slotIdPadded}`,
              `video_${slotIdStr}`,
              `video_${slotIdPadded}`,
              `video-${slotIdStr}`,
              `video-${slotIdPadded}`,
              `reel${slotIdStr}`,
              `reel${slotIdPadded}`,
              `reel_${slotIdStr}`,
              `reel_${slotIdPadded}`,
              `foto${slotIdStr}`,
              `foto${slotIdPadded}`,
              `foto_${slotIdStr}`,
              `foto_${slotIdPadded}`,
              `imagem${slotIdStr}`,
              `imagem${slotIdPadded}`,
              `imagem_${slotIdStr}`,
              `imagem_${slotIdPadded}`,
              `midia${slotIdStr}`,
              `midia${slotIdPadded}`,
            ];

            if (validExactNames.includes(nameWithoutExt)) return true;
            if (nameLower.startsWith(`${slotIdStr}.`) || nameLower.startsWith(`${slotIdPadded}.`)) return true;
            if (nameLower.startsWith(`${slotIdStr}_`) || nameLower.startsWith(`${slotIdPadded}_`)) return true;
            if (nameLower.startsWith(`${slotIdStr}-`) || nameLower.startsWith(`${slotIdPadded}-`)) return true;
            return false;
          });

          if (matchedFile && matchedBucket) {
            // Obtém URL Pública
            const { data: publicData } = supabase.storage.from(matchedBucket).getPublicUrl(matchedFile.name);
            const publicUrl = publicData?.publicUrl || '';

            // Tenta obter também uma Signed URL válida por 1 ano (31536000s) para contornar caso o bucket seja privado
            let signedUrl = '';
            try {
              const { data: signedData, error: signErr } = await supabase.storage
                .from(matchedBucket)
                .createSignedUrl(matchedFile.name, 60 * 60 * 24 * 365);

              if (!signErr && signedData?.signedUrl) {
                signedUrl = signedData.signedUrl;
              }
            } catch (e) {
              console.warn(`[Slot ${slot.id}] Não foi possível gerar Signed URL:`, e);
            }

            console.log(`▶️ Mídia ${slot.id} (${matchedFile.name}):`, { publicUrl, signedUrl: signedUrl ? 'Criada com sucesso' : 'N/A' });

            // Se conseguimos uma Signed URL válida, usamos ela como padrão preferencial para evitar o erro AccessDenied se o bucket for privado
            const chosenUrl = signedUrl || publicUrl || slot.fallbackSrc;

            return {
              ...slot,
              src: chosenUrl,
              signedUrl: signedUrl || undefined,
              isSupabase: true,
              fileName: matchedFile.name,
            };
          }

          return slot;
        });

        const resolvedSlots = await Promise.all(updatedSlotsPromises);
        setSlots(resolvedSlots);

      } catch (err: any) {
        console.warn('Supabase Storage load skipped:', err?.message || err);
      } finally {
        console.groupEnd();
      }
    }

    checkSupabaseAndLoadFiles();
  }, []);

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-brand-cream w-full" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div className="max-w-xl">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-brand-wine uppercase block mb-4">
              {brandConfig.portfolio.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-brand-text tracking-tight font-serif">
              {brandConfig.portfolio.title}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <a
              href={brandConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-wine hover:text-brand-wine-dark text-xs font-semibold tracking-wider uppercase transition-colors duration-300 border-b border-brand-wine/20 pb-1"
              id="portfolio-instagram-link"
            >
              <Instagram className="w-4 h-4" />
              <span>Acompanhe no Instagram</span>
            </a>
          </motion.div>
        </div>

        {/* Portfolio Grid: 6 items in Instagram Reels ratio 9:16 (3 columns on desktop, 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
          {slots.map((slot, index) =>
            slot.type === 'video' ? (
              <ReelVideoCard key={slot.id} slot={slot} index={index} />
            ) : (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-lg bg-brand-beige-dark group"
              >
                <Image
                  src={slot.src}
                  alt={`Registro por Modkovski Fotografia ${slot.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== slot.fallbackSrc) {
                      target.src = slot.fallbackSrc;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-brand-wine/5 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

