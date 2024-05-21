'use client';

import { useEffect, useState } from 'react';
import { AddTeamModal } from '../modals/add-team-modal';
import { AddTournamentModal } from '../modals/add-tournament-modal';
import { EditTournamentModal } from '../modals/edit-tournament-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddTournamentModal />
      <EditTournamentModal />
      <AddTeamModal />
    </>
  );
};
