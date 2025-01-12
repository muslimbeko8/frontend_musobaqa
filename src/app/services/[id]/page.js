"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { useGetServiceIdQuery } from "@/lib/service/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  CardContent,
  Card,
} from "@mui/material";
import { Trash2 } from "lucide-react";

export default function ServiceDetails() {
  const { id } = useParams();

  const [openDoctorId, setOpenDoctorId] = useState(null);

  useAuth();

  const { data: service, error, isLoading } = useGetServiceIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-blue-500">
            Loading service details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Service
          </h3>
          <p className="text-red-600">
            {error.data?.message || "Failed to fetch service details"}
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-gray-500 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-medium">No service details available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Service Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            {service.type?.icon && (
              <div className="mb-6 inline-flex p-4 bg-blue-50 rounded-full">
                <img
                  src={service.type.icon}
                  alt={service.type?.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.type?.name}
            </h1>
            <p className="text-xl text-gray-600">
              {service.type?.description ||
                "No description available for this service."}
            </p>
          </div>
        </div>

        {/* Doctors Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="text-2xl">👨‍⚕️</span>
            Medical Professionals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.doctors?.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={`${doctor.first_name} ${doctor.last_name}`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl font-bold text-blue-500 border-4 border-white shadow-md">
                        {doctor.first_name[0]}
                        {doctor.last_name[0]}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Dr. {doctor.first_name} {doctor.last_name}
                        </h3>
                        <button
                          onClick={() => setOpenDoctorId(doctor.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-2 space-y-1">
                        {doctor.phone && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <span>📱</span>
                            {doctor.phone}
                          </p>
                        )}
                        {doctor.experience && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <span>🎓</span>
                            {doctor.experience} years experience
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {openDoctorId && (
          <AlertDialog open={true} onOpenChange={() => setOpenDoctorId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this doctor from the service?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    console.log("Delete doctor:", openDoctorId);
                    setOpenDoctorId(null);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
