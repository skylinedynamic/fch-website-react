const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface LeadPayload {
  contact_person: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  requirements_details?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitLead = async (payload: LeadPayload): Promise<LeadResponse> => {
  const response = await fetch(`${API_BASE_URL}/website/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // Surface validation or server errors
    const errorMessage =
      data?.message ||
      (data?.errors ? Object.values(data.errors).flat().join(' ') : 'Something went wrong. Please try again.');
    throw new Error(errorMessage);
  }

  return data;
};
