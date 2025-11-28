"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import LoginModal from "@/components/LoginModal";
import Toast from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/app-css/agendamento.css";
import "@/styles/components-css/login-modal.css";

export default function AgendamentoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const servico = searchParams.get("servico") || "Lavagem Simples";
  const preco = searchParams.get("preco") || "50,00";
  
  const servicoImage = servico === "Lavagem Completa" 
    ? "/images/services/detalhada2.png" 
    : "/images/services/detalhada1.PNG";
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentPrice, setCurrentPrice] = useState(preco);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);


  const { user, loading } = useAuth();


  const generateMonthCalendar = () => {
    const today = new Date();
    const year = currentYear;
    const month = currentMonth;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const fullDate = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      
      const diffInDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const isAvailable = !isPast && !isToday && diffInDays >= 1 && diffInDays <= 7;
      
      days.push({
        day: day,
        month: month,
        year: year,
        fullDate: fullDate,
        isToday: isToday,
        isPast: isPast,
        isAvailable: isAvailable,
        dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' })
      });
    }
    
    return {
      days,
      monthName: firstDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    };
  };


  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };


  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };


  const today = new Date();
  const canGoPrevious = currentYear > today.getFullYear() || 
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());
  
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const diffToNextMonth = Math.ceil((nextMonthDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const canGoNext = diffToNextMonth <= 7;


  const getAvailableTimeSlots = (date: string) => {
    const allSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
    
    const existingBookings: { [key: string]: string[] } = {
      "2025-11-29": ["09:00"],
      "2025-11-30": ["14:00"],
    };
    
    const bookedSlots = existingBookings[date] || [];

    if (bookedSlots.length === 0) {
      return allSlots;
    }

    const availableSlots = allSlots.filter(slot => {
      if (bookedSlots.includes(slot)) {
        return false;
      }

      const currentTime = parseTime(slot);
      
      for (const bookedSlot of bookedSlots) {
        const bookedTime = parseTime(bookedSlot);
        const timeDiff = Math.abs(currentTime - bookedTime);

        if (timeDiff < 240) {
          return false;
        }
      }
      
      return true;
    });
    
    return availableSlots;
  };


  const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };


  useEffect(() => {
    if (selectedDate) {
      const available = getAvailableTimeSlots(selectedDate);
      setAvailableSlots(available);
      setSelectedTime("");
    }
  }, [selectedDate]);

  const categories = [
    "Hatch",
    "Sedan",
    "Suv",
    "Caminhonete"
  ];

  const fetchPriceByCategory = async (category: string, serviceType: string) => {
    const priceMap: { [key: string]: { [key: string]: string } } = {
      "Lavagem Simples": {
        "Hatch": "80,00",
        "Sedan": "90,00",
        "SUV": "95,00",
        "caminhonete": "120,00"
      },
      "Lavagem Completa": {
        "Hatch": "100,00",
        "Sedan": "110,00",
        "SUV": "115,00",
        "caminhonete": "150,00"
      }
    };
    
    return priceMap[serviceType]?.[category] || preco;
  };


  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    
    if (category) {
      const newPrice = await fetchPriceByCategory(category, servico);
      setCurrentPrice(newPrice);
    } else {
      setCurrentPrice(preco);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    if (!selectedDate || !selectedTime || !selectedCategory) {
      setToast({ message: "Por favor, preencha todos os campos", type: "warning" });
      return;
    }

    setToast({ message: "Agendamento realizado com sucesso!", type: "success" });
    
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <NavBar />
      
      <div className="agendamento-container">
        <div className="agendamento-content">
          <div className="service-info">
            <div className="service-image-container">
              <img 
                src={servicoImage} 
                alt={servico}
                className="service-image"
              />
            </div>
            <div className="service-details">
              <h2 className="service-title">{servico}</h2>
              <div className="price-container">
                {selectedCategory ? (
                  <p className="service-price-text">R$ {currentPrice}</p>
                ) : (
                  <p className="service-price-text">A Partir de R$ {preco}</p>
                )}
                <p className="service-note">
                  {selectedCategory 
                    ? `Preço para veículo ${selectedCategory}` 
                    : "*Preço varia com base na categoria do veículo selecionado*"
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="booking-form-container">
            <form onSubmit={handleSubmit} className="booking-form">
              
              <div className="form-section">
                <div className="calendar-navigation">
                  <button 
                    type="button"
                    onClick={goToPreviousMonth}
                    disabled={!canGoPrevious}
                    className="nav-button"
                  >
                    ←
                  </button>
                  <h3 className="section-title">{generateMonthCalendar().monthName}</h3>
                  <button 
                    type="button"
                    onClick={goToNextMonth}
                    disabled={!canGoNext}
                    className="nav-button"
                  >
                    →
                  </button>
                </div>
                <p className="calendar-subtitle">Dias disponíveis nos próximos 7 dias</p>
                
                <div className="calendar-header">
                  <div className="day-header">Dom</div>
                  <div className="day-header">Seg</div>
                  <div className="day-header">Ter</div>
                  <div className="day-header">Qua</div>
                  <div className="day-header">Qui</div>
                  <div className="day-header">Sex</div>
                  <div className="day-header">Sáb</div>
                </div>
                
                <div className="calendar-month-grid">
                  {generateMonthCalendar().days.map((dateObj, index) => (
                    <div key={index} className="calendar-day-container">
                      {dateObj ? (
                        <button
                          type="button"
                          disabled={!dateObj.isAvailable}
                          className={`
                            calendar-month-day 
                            ${dateObj.isToday ? 'today' : ''}
                            ${dateObj.isPast ? 'past' : ''}
                            ${!dateObj.isAvailable ? 'blocked' : 'available'}
                            ${selectedDate === dateObj.fullDate ? 'selected' : ''}
                          `}
                          onClick={() => dateObj.isAvailable ? setSelectedDate(dateObj.fullDate) : null}
                        >
                          {dateObj.day}
                        </button>
                      ) : (
                        <div className="empty-day"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label className="section-label">Horário:</label>
                {!selectedDate ? (
                  <select disabled className="form-select disabled">
                    <option>Selecione uma data primeiro</option>
                  </select>
                ) : (
                  <>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Selecionar horário</option>
                      {availableSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {availableSlots.length === 0 && (
                      <p className="time-rule-info">
                        Nenhum horário disponível. Lembre-se: deve haver pelo menos 4 horas entre lavagens.
                      </p>
                    )}
                    {availableSlots.length > 0 && availableSlots.length < 4 && (
                      <p className="time-rule-info">
                        Poucos horários disponíveis devido à regra de 4 horas entre lavagens.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-section">
                <label className="section-label">Categoria:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecionar categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="agendar-button">
                Agendar
              </button>
            </form>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}