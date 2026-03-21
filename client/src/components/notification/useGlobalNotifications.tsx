/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export function useGlobalNotifications(
  socket: any,
  conversations: any[],
  brandTitle?: string
) {
  const [location] = useLocation();

  // 🔔 Browser title update (ALWAYS works)
  useEffect(() => {
    const totalUnread = conversations.reduce(
      (sum, c) => sum + (c.unreadCount || 0),
      0
    );

    const defaultTitle = brandTitle || "TaysirOne";
    document.title =
      totalUnread > 0 ? `(${totalUnread}) ${defaultTitle}` : defaultTitle;
  }, [conversations, brandTitle]);

  // 🔔 Browser notification (ALWAYS works)
  useEffect(() => {
    if (!socket) return;

    const handler = (data: any) => {
      const message =
        typeof data?.content === "string"
          ? data.content
          : "New message";

      const isInbox = location.startsWith("/inbox");
      const shouldNotify =
        Notification.permission === "granted" &&
        !document.hasFocus();

      if (shouldNotify) {
        new Notification("New WhatsApp Message", {
          body: message,
          icon: "/whatsapp-icon.png",
        });
      }
    };

    socket.on("new-message", handler);
    return () => socket.off("new-message", handler);
  }, [socket, location]);
}
