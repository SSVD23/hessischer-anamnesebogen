import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AnamnesisContext = createContext(null);

const emptyState = {
  profile: { relation: "self", firstName: "", lastName: "", dateOfBirth: "" },
  answers: {},
  currentStep: 0,
  completedAt: null,
  createdAt: null,
};

export function AnamnesisProvider({ children }) {
  const [data, setData, removeData] = useLocalStorage("anamnesis.data", emptyState);

  const hasSavedData =
    !!data &&
    ((data.profile && (data.profile.firstName || data.profile.dateOfBirth)) ||
      (data.answers && Object.keys(data.answers).length > 0));

  const setProfile = useCallback(
    (updater) =>
      setData((prev) => ({
        ...prev,
        createdAt: prev.createdAt || new Date().toISOString(),
        profile: { ...prev.profile, ...(typeof updater === "function" ? updater(prev.profile) : updater) },
      })),
    [setData]
  );

  const setAnswer = useCallback(
    (sectionId, fieldName, value) =>
      setData((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [sectionId]: { ...(prev.answers[sectionId] || {}), [fieldName]: value },
        },
      })),
    [setData]
  );

  const setCurrentStep = useCallback(
    (step) => setData((prev) => ({ ...prev, currentStep: step })),
    [setData]
  );

  const markComplete = useCallback(
    () => setData((prev) => ({ ...prev, completedAt: new Date().toISOString() })),
    [setData]
  );

  const reset = useCallback(() => {
    removeData();
    setData(emptyState);
  }, [removeData, setData]);

  return (
    <AnamnesisContext.Provider
      value={{ data, hasSavedData, setProfile, setAnswer, setCurrentStep, markComplete, reset }}
    >
      {children}
    </AnamnesisContext.Provider>
  );
}

export function useAnamnesis() {
  const ctx = useContext(AnamnesisContext);
  if (!ctx) throw new Error("useAnamnesis must be used within AnamnesisProvider");
  return ctx;
}
