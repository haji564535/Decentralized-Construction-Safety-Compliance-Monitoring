;; Safety Manager Verification Contract
;; This contract validates construction safety managers

(define-data-var admin principal tx-sender)

;; Map of verified safety managers
(define-map safety-managers principal
  {
    name: (string-utf8 50),
    certification-id: (string-utf8 20),
    expiration: uint,
    active: bool
  }
)

;; Add a new safety manager (admin only)
(define-public (register-safety-manager (manager principal) (name (string-utf8 50)) (certification-id (string-utf8 20)) (expiration uint))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u403))
    (ok (map-set safety-managers manager {
      name: name,
      certification-id: certification-id,
      expiration: expiration,
      active: true
    }))
  )
)

;; Deactivate a safety manager (admin only)
(define-public (deactivate-safety-manager (manager principal))
  (let ((current-manager (unwrap! (map-get? safety-managers manager) (err u404))))
    (begin
      (asserts! (is-eq tx-sender (var-get admin)) (err u403))
      (ok (map-set safety-managers manager
        (merge current-manager { active: false })))
    )
  )
)

;; Check if a manager is active and certification is not expired
(define-read-only (is-manager-valid (manager principal))
  (let ((manager-data (map-get? safety-managers manager)))
    (if (is-some manager-data)
      (let ((data (unwrap-panic manager-data)))
        (and
          (get active data)
          (> (get expiration data) block-height)
        )
      )
      false
    )
  )
)

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u403))
    (ok (var-set admin new-admin))
  )
)

;; Get manager details
(define-read-only (get-manager-details (manager principal))
  (map-get? safety-managers manager)
)
