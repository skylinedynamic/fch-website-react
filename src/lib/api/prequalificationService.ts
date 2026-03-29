export interface PrequalificationData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  business_website?: string;
  state_of_incorporation: string;
  business_name: string;
  industry_type: string;
  business_structure: string;
  years_in_business: string;
  monthly_revenue: string | number;
  annual_revenue: string | number;
  funding_requested_amount: string | number;
  funding_urgency: string;
  purpose_of_funding: string;
  personal_credit_score: string;
  estimated_business_credit_score: string;
  existing_business_debt: boolean;
  debt_balance?: string | number;
  notes?: string;
}

export const submitPrequalification = async (data: PrequalificationData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/website/pre-qualification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong while submitting the form');
  }

  return result;
};
